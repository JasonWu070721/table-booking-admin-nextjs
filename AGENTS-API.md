# AGENTS & RBAC Guide (Current Backend Status)

This document defines the **roles**, **permissions**, **data boundaries**, and **API relationships** for the **Table Booking SaaS backend** - a multi-tenant POS + tableside ordering + venue management system.

---

## System Overview

**Current Status (as of 2025-11-08)**

- **Architecture**: Django REST Framework 3.16.1 + PostgreSQL 17.6 (multi-tenant via `tenant` FK)
- **Python**: 3.12.7
- **Authentication**: SimpleJWT (access/refresh tokens)
- **API Documentation**: drf-spectacular (OpenAPI 3.0)
- **Testing**: pytest-django
- **Platform**: Windows 11

### Technology Stack

- **Framework**: Django REST Framework with multi-tenant isolation
- **Database**: PostgreSQL with tenant-scoped foreign keys
- **Authentication**: JWT-based with SimpleJWT
- **API Versioning**: Primary surface `/api/v1/` with legacy `/api/` mirror
- **Error Handling**: Unified error envelope with structured codes (see `ERROR_CODES.md`)
- **API Conventions**: kebab-case URLs, snake_case JSON fields (see `API_NAMING_CONVENTIONS.md`)

### Implemented Features

**Core Systems:**
- ✅ Multi-tenant user management (Owner/Admin/Member roles)
- ✅ JWT authentication with tenant context switching
- ✅ Token-based invitation system with role management
- ✅ Public venue discovery and anonymous reservations

**Table Management:**
- ✅ Tables with zones, tags, features, groups
- ✅ Table holds and closures (maintenance/events)
- ✅ Centralized state machine with audit trail
- ✅ Real-time table session monitoring

**Reservation System:**
- ✅ Full CRUD with status workflow (PENDING → BOOKED → CONFIRMED → SEATED → COMPLETED)
- ✅ Party composition tracking (adults/children)
- ✅ Overlap validation and capacity checks
- ✅ Availability slot APIs with table-level scheduling
- ✅ Self-service customer reservation management
- ✅ Walk-in queue system with ticket management

**Order & Payment:**
- ✅ Food/beverage ordering with line items
- ✅ Order status workflow (PENDING → SERVED → PAID)
- ✅ Multi-method payments (Cash, Line Pay, Credit Card)
- ✅ Split billing (equal/item/ratio/custom)
- ✅ Bill-payment integration with refund support
- ✅ Coupon system with discount rules
- ✅ Order items capture pre-modifier selections with kitchen-facing display names
- ✅ Loyalty redemption + earn tracking via `Order.applied_loyalty_info` with automatic accrual on paid orders

**Menu Management:**
- ✅ Categories, menus, menu items with dietary tags
- ✅ Stock management and availability scheduling
- ✅ Product options and variants with pricing
- ✅ Nested modifier groups via OptionGroup + recursive pricing strategies (INHERIT/INDEPENDENT/ADDITIVE)
- ✅ Item collections (CUSTOM/SMART/COMBO types)
- ✅ Add-buy promotions with inventory tracking
- ✅ Pre-modifier catalog + grouping (EXTRA/NO/LIGHT/SIDE/HEAVY) with tenant seeding and API management

**Revenue Centers (NEW - 2025-11-19):**
- ✅ Tenant-scoped `RevenueCenter` model with `name`, optional `external_id`, timestamps, and `is_active` soft-delete flag.
- ✅ Menu items, orders, employees, and shifts can optionally reference a revenue center for attribution and filtering.
- ✅ `/api/v1/revenue-centers/` CRUD + `/sales-report/` action provides per-center totals (sales, order count, average ticket).
- ✅ Daily sales and revenue reports understand revenue center filters/groupings for granular analytics.

**Loyalty & Rewards (NEW - 2025-11-18):**
- ✅ Tenant-scoped `LoyaltyProgram` with configurable `points_per_dollar`, `redemption_rate`, and tier thresholds
- ✅ `CustomerLoyalty` profiles tracking current balance, lifetime accruals, and auto-tier upgrades (BRONZE/SILVER/GOLD/PLATINUM)
- ✅ `LoyaltyTransaction` ledger for earn/redeem/adjust/expire flows with balance snapshots and optional order links
- ✅ APIs for listing/creating programs plus customer-facing summary, manual earn, redeem, and transaction history endpoints
- ✅ `Order.applied_loyalty_info` snapshot + automatic point accrual on `PAID` transition and redemption-driven discounts tied to orders

**Labor & HR Management (NEW - 2025-11-08):**
- ✅ Employee profiles with user account integration
- ✅ Job (position) management with wage configuration
- ✅ Multi-job employee assignments with wage overrides
- ✅ Shift scheduling with status workflow (scheduled/in_progress/completed/cancelled)
- ✅ Time entry tracking with clock-in/out automation
- ✅ Wage calculation (regular + overtime with 1.5x multiplier)
- ✅ Break type configuration (paid/unpaid)
- ✅ Employee archiving (soft deletion with termination tracking)
- ✅ Performance metrics (orders per hour, labor cost)
- ✅ Time entry approval workflow (Manager+)
- ✅ Employee attribution across orders/bills/payments/cash operations
- ✅ Self-service clock-in/out for member role
- ✅ Backward-compatible proxy models (Staff/StaffShift/StaffAttendance)

**Financial & Compliance:**
- ✅ Cash drawer operations with session tracking
- ✅ Taiwan e-invoice system with track management
- ✅ Expense tracking and categorization
- ✅ Sales reports and analytics (daily/revenue/profit)
- ✅ Approval workflow system (discounts/voids/refunds)

**Multi-Location Support (NEW):**
- ✅ Brand and location hierarchy
- ✅ Location-scoped member access control
- ✅ Default location provisioning

---

## Core Architecture Patterns

### Multi-Tenancy Design

1. **Tenant Isolation**: All domain models include `tenant` FK with CASCADE deletion
2. **Soft Deletion**: Tables, zones, groups use `SoftDeletable` mixin (`is_active` flag)
3. **Audit Trail**: All models inherit `TimeStamped` mixin (`created_at`, `updated_at`)
4. **Queryset Filtering**: All ViewSets auto-filter by `user.current_tenant`

### Model Inheritance Hierarchy

```python
# Common mixins (apps/common/models.py)
TimeStamped → created_at, updated_at
SoftDeletable → is_active (default=True)
TenantOwned → tenant FK (CASCADE)

# Model combinations
Table → TenantOwned + TimeStamped + SoftDeletable
Reservation → TimeStamped (has tenant FK but not via mixin)
Order → TenantOwned + TimeStamped
Employee → TimeStamped (has tenant FK, uses is_archived instead of is_active)
Job → TimeStamped + SoftDeletable (has tenant FK)
Shift → TenantOwned + TimeStamped
TimeEntry → TenantOwned + TimeStamped
OptionGroup → TenantOwned + TimeStamped + SoftDeletable (menu_item FK, optional parent_option for nested UX)

# Legacy proxy models (backward compatibility)
Staff → Employee (proxy)
StaffRole → Job (proxy)
StaffShift → Shift (proxy with field aliasing)
StaffAttendance → TimeEntry (proxy with field aliasing)
```

### Permission Classes

- `IsOwnerOfTenant` - owner-only operations (tenant settings, deletion)
- `IsOwnerOrAdminOfTenant` - owner/admin operations (invitations, member management)
- `IsOwnerAdminOrMember` - all staff operations (tables, reservations, orders)
- `IsReservationCustomer` - self-service customer reservations (email-bound)
- `IsStaffOrAbove` - staff operations (cash drawer, attendance)
- `IsManagerOrAbove` - manager+ operations (reports, void entries)
- `LaborAdminOnly` - labor management (Owner/Admin only - jobs, shifts, breaks)
- `EmployeeAccessPermission` - employee data (Owner/Admin full, Member self-only)
- `TimeEntryApprovalPermission` - time entry approval (Manager+)
- `AllowAny` - public endpoints (venue discovery, anonymous reservations)

### API Conventions (2025-11-04)

- **URL paths**: kebab-case (e.g., `/api/items/batch-create/`)
- **JSON fields**: snake_case in requests and responses
- **Query parameters**: snake_case
- **Batch operations**: Use `batch-` prefix for endpoints
- **Response envelope**: All successful responses return `{"data": ...}` and list responses always include `meta` (pagination stats) + `links` (HATEOAS pointers)
- **Request correlation**: `RequestIDMiddleware` issues an `X-Request-ID` header for every request and logs the same token; clients should echo it in support tickets
- **Error responses**: Structured error body with `code`, `details[]`, `request_id`, and `documentation_url` (see `ERROR_CODES.md`)
- **Tag naming**: Avoid TypeScript reserved keywords (for example, `public`, `private`, `default`) when defining OpenAPI tags; `tests/test_openapi_tags.py` enforces this rule for future specs.

### Business Date Handling

- Tenants configure a `business_day_end_hour` (default 4AM) that defines when the trading day rolls to the next business date.
- `BusinessDateService` centralizes the cutoff logic and automatically stamps `business_date` on Orders, Payments, CashDrawerSessions, Shifts, and TimeEntries.
- Reporting endpoints and payment/order filters use `business_date` to keep cross-midnight activity grouped with the intended service day.

### Endpoint Migration Plan (Customer `/me` suffix)

| Milestone | Date | Notes |
|-----------|------|-------|
| `/me` endpoints GA | 2025-11-07 | `/api/v1/reservations/me/` and `/api/v1/coupons/me/` ship with unified response envelopes |
| Legacy alias warning | 2025-11-07 | `/api/my/...` routes now emit `X-Deprecated-Endpoint: true` + HTTP `Warning` headers referencing the `/me` replacement |
| Sunset window closes | 2026-05-05 | Legacy aliases will be removed alongside the API v0 mirror |

**Migration steps**
1. Update client routers to hit `/api/v1/**/me/` paths and rely on the new `data/meta/links` envelope.
2. Log and propagate the `X-Request-ID` header; the same token is echoed inside every error payload.
3. Monitor CI for `Warning` headers to verify no traffic remains on `/api/my/...` before the May 2026 cutoff.
4. Regenerate client SDKs from the refreshed `schema.yaml` to inherit the new shapes.

---

## Core Data Model Relationships

### Entity Relationship Overview

```text
User (1) ←──── (N) TenantMembership (N) ────→ (1) Tenant
    │                                               │
    │                 ┌─────────────────────────────┼──────────────────────────┐
    │                 │                             │                          │
    ↓                 ▼                             ▼                          ▼
Employee ──→   Brand/Location                 TableZone              MenuCategory
    │               │                             │                          │
    │               ▼                             ▼                          ▼
    │        TenantMembership              Table/TableGroup              Menu
    │            Location                        │                          │
    ↓                                            │                          ▼
EmployeeJob ↔ Job                  ┌─────────────┼─────────────┐        MenuItem
    │                               │             │             │           │
    │                               ▼             ▼             ▼           │
    │                         Reservation      Queue         Order ←────────┘
    │                               │             │             │
    ├───────> Shift                 └─────────────┴─────────────┘
    │           │                                 │
    └───────> TimeEntry               ┌───────────┼─────────────┐
                                      ▼           ▼             ▼
                                    Bill      Payment      OrderItem
                                      │           │
                                      └───────────┘
                                            │
                                            ▼
                                        Invoice

Labor Management (NEW - 2025-11-08):
  Employee (1) → (1) User [PROTECT]
  Employee (N) → (1) Tenant [CASCADE]
  Employee (N) ↔ (N) Job via EmployeeJob [M2M]
  Shift (N) → (1) Employee, (1) Job [PROTECT]
  TimeEntry (N) → (1) Employee, (1) Job [PROTECT], (0/1) Shift [SET_NULL]
```

### Critical Relationships

**1. User → Tenant (Many-to-Many via TenantMembership)**
- User can belong to multiple tenants with different roles
- `User.current_tenant` tracks active context for API scoping
- Access: `/api/tenants/my-memberships/`

**2. Tenant → Tables**
- `Tenant` (1) → (N) `TableZone` → (N) `Table`
- `Table` (N) → (N) `TableTag`, `TableFeature` (many-to-many)
- `TableGroup` combines multiple tables with dynamic capacity
- `TableHold` and `TableClosure` block tables/zones by time period

**3. Table → Reservation**
- `Reservation` (N) → (1) `Table` (PROTECT: cannot delete table with reservations)
- Party composition: `adults` + `children` = `party_size`
- Status flow: `PENDING` → `BOOKED` → `CONFIRMED` → `SEATED` → `COMPLETED`
- Validates: overlap, capacity, holds, closures

**4. Table → Queue (Walk-in System)**
- `Queue` (N) → (1) `Table` (SET_NULL: assigned when seated)
- Auto-generates ticket numbers (A001, B042, etc.)
- Status flow: `WAITING` → `CALLED` → `SEATED`
- Can convert to reservation via `/api/queues/{id}/convert-to-reservation/`

**5. Order → Payment Flow**
- `Order` (N) → (1) `Table` (PROTECT)
- `Order` (1) → (N) `OrderItem` (CASCADE)
- `Order` (1) → (N) `Bill` (PROTECT: issued bills block deletion)
- `Bill` (N) → (N) `Payment` via `BillPayment` (many-to-many)
- Split billing: `BillSplit` + `BillSplitAllocation` track participant shares

**6. Menu → Order Integration**
- `MenuItem` (N) → (1) `Menu` (CASCADE)
- `MenuItem` (N) → (1) `MenuCategory` (SET_NULL)
- `OrderItem` can reference `MenuItem` or `ProductVariant`
- `ItemCollection` groups items (CUSTOM/SMART/COMBO types)
- `AddBuyItem` enables upsell promotions with inventory tracking

**7. Menu Modifiers & Pricing**
- `OptionGroup` (N) → (1) `MenuItem` clusters related modifiers with min/max rules
- `ProductOption` supports recursive nesting via `parent_option` and exposes `nested_pricing_strategy`
- Nested pricing strategies:
  - `INHERIT`: child selections reuse parent pricing
  - `INDEPENDENT`: child selections have standalone pricing
  - `ADDITIVE`: parent + child pricing stack (e.g., $2 cheese + $1 extra portion = $3)
- `PricingService` consumes the option tree to calculate price deltas for menu items

**8. Coupon System**
- `Coupon` (N) → (1) `Tenant` with discount rules
- `CustomerCoupon` (N) → (1) `Customer` tracks issuance/usage
- `Order.applied_coupon` + `discount_total` enable redemption
- Validates: applicable items/categories, usage limits, expiry

**9. Employee & Labor Management (NEW - 2025-11-08)**
- `Employee` (N) → (1) `Tenant`, (1) → (1) `User` (PROTECT)
- `Employee` (N) → (0/1) `TenantMembership` (SET_NULL, optional link)
- `Employee` (N) ↔ (N) `Job` via `EmployeeJob` (M2M with wage_override, is_primary)
- `Job` (N) → (1) `Tenant` with base_wage, permissions (JSONField)
- `Shift` (N) → (1) `Employee`, (1) → (1) `Job` (PROTECT)
- `TimeEntry` (N) → (1) `Employee`, (1) → (1) `Job`, (0/1) → (1) `Shift` (SET_NULL)
- `TimeEntry` (N) → (0/1) `User` (approved_by, SET_NULL)
- `BreakType` (N) → (1) `Tenant` with duration, is_paid flag
- `Order.staff`, `Bill.staff`, `Payment.staff`, `CashDrawer.opened_by/closed_by` → Employee
- Legacy `staff_name` text field as fallback (auto-filled from employee.display_name)
- Wage calculation: wage_override > base_wage; overtime = hours > 8 × 1.5
- Employee archiving: soft deletion with termination_date, resigned_at, resignation_reason
- Legacy proxy models: Staff/StaffRole/StaffShift/StaffAttendance for backward compatibility

**10. Cash Management**
- `CashDrawer` (N) → (1) `Tenant` tracks physical registers
- `CashDrawerSession` (N) → (1) `CashDrawer` for shift-based tracking
- `CashEntry` (N) → (1) `CashDrawer` logs transactions (11 types)
- Auto-creates entries when cash payments complete/refund

**11. E-Invoice System (Taiwan Compliance)**
- `InvoiceTrack` (N) → (1) `Tenant` manages number allocation
- `Invoice` (1) → (1) `Bill` (PROTECT), (0/1) → (1) `Payment` (SET_NULL)
- `InvoiceAllowance` (N) → (1) `Invoice` for credit notes
- Auto-allocates invoice numbers with row-level locking

**12. Approval Workflow**
- `ApprovalRequest` captures workflow metadata (UUID PK, GenericForeignKey to target)
- `ApprovalRule` stores tenant-scoped JSON conditions and role requirements
- Request types: DISCOUNT, ORDER_VOID, REFUND, PRICE_CHANGE, ATTENDANCE_OVERRIDE
- Status flow: `PENDING` → `APPROVED`/`REJECTED`/`CANCELLED`/`EXPIRED`

**13. Brand & Location Hierarchy**
- `Brand` (N) → (1) `Tenant` for marketing identity
- `Location` (N) → (0/1) `Brand` for store-front metadata
- `TenantMembership.locations` (M2M) for member access control
- Owner/Admin inherit all locations; Members restricted to assignments

**14. Loyalty Programs**
- `LoyaltyProgram` (N) → (1) `Tenant` defines earning + redemption ratios and tier config
- `CustomerLoyalty` (1) → (1) `Customer`, (N) → (1) `LoyaltyProgram` tracks `points`, `lifetime_points`, and tier
- `LoyaltyTransaction` (N) → (1) `CustomerLoyalty`, (0/1) → (1) `Order` logs earn/redeem/adjust/expire deltas with balance snapshots
- `Order.applied_loyalty_info` persists redemption + earn payloads for downstream receipts/reporting

**15. Revenue Centers**
- `RevenueCenter` (N) → (1) `Tenant` holds name/external_id and soft-delete state.
- `MenuItem` (0/1) → (1) `RevenueCenter` aligns catalog items to a center for reporting.
- `Order` (0/1) → (1) `RevenueCenter` drives table-service attribution and reporting filters.
- `Employee` + `Shift` (0/1) → (1) `RevenueCenter` capture team alignment for labor analytics.

---

## Roles & Permissions

### Role Hierarchy

**Owner** (1 per tenant - enforced by DB constraint)
- Full tenant control: settings, role management, deletion
- Can invite/manage Admins and Members
- Can transfer ownership to existing Admin
- Access to all financial reports and exports
- Endpoint: `POST /api/tenants/{uuid}/transfer-ownership/`

**Admin**
- Daily operations: tables, reservations, orders, menu management
- Can invite and manage Members (not other Admins)
- Cannot view detailed tenant statistics
- Access to financial reports (revenue, staff performance)
- Cannot delete tenant or change owner

**Member**
- Front-line operations: reservations, orders, queue management
- Self-service clock-in/out for attendance
- Read-only access to product options/variants
- Currently has full CRUD (future: zone/shift scoped)
- Cannot access financial reports or settings

**Customer** (planned)
- Self-service reservations via `/api/v1/reservations/me/` (legacy alias `/api/my/reservations/`)
- Currently email-based with `IsReservationCustomer` permission
- Dedicated membership role pending implementation

### Permission Matrix (Simplified)

| Resource | Owner | Admin | Member | Customer | Anonymous |
|----------|:-----:|:-----:|:------:|:--------:|:---------:|
| Tenant settings | ✓ | ✗ | ✗ | ✗ | ✗ |
| Invite Admins | ✓ | ✗ | ✗ | ✗ | ✗ |
| Invite Members | ✓ | ✓ | ✗ | ✗ | ✗ |
| Tables/Reservations | ✓ | ✓ | ✓ | ✗ | ✗ |
| Orders/Payments | ✓ | ✓ | ✓ | ✗ | ✗ |
| Menu Management | ✓ | ✓ | ✓ | ✗ | ✗ |
| Financial Reports | ✓ | ✓ | ✗ | ✗ | ✗ |
| Employee Management | ✓ | ✓ | Self only | ✗ | ✗ |
| Job/Shift/Break Mgmt | ✓ | ✓ | ✗ | ✗ | ✗ |
| Time Entry (CRUD) | ✓ | ✓ | ✗ | ✗ | ✗ |
| Clock In/Out | ✓ | ✓ | ✓ (self) | ✗ | ✗ |
| Approve Time Entry | ✓ | ✓ | ✗ | ✗ | ✗ |
| My Reservations | ✓ | ✓ | ✓ | ✓ (planned) | ✗ |
| Public Reservations | ✓ | ✓ | ✓ | ✓ | ✓ (create only) |

**Note**: All operations enforce strict tenant isolation via queryset filtering and object-level permissions.

---

## Key API Endpoints (Organized by Domain)

### Authentication & User Management

```
POST   /api/register/                          # Register user
POST   /api/register-and-create-tenant/        # Register + create tenant as Owner
POST   /api/token/                             # Obtain JWT tokens
POST   /api/token/refresh/                     # Refresh access token
GET    /api/users/me/                          # Get current user profile
POST   /api/users/switch-tenant/               # Switch active tenant context
```

### Tenant & Membership

```
GET    /api/tenants/                           # List user's tenants
POST   /api/tenants/                           # Create new tenant (become Owner)
GET    /api/tenants/{uuid}/                    # Get tenant details
PATCH  /api/tenants/{uuid}/                    # Update tenant settings (Owner)
DELETE /api/tenants/{uuid}/                    # Delete tenant (Owner)
POST   /api/tenants/{uuid}/transfer-ownership/ # Transfer ownership to Admin
GET    /api/tenants/my-memberships/            # List all memberships

GET    /api/tenant-memberships/                # List members
PATCH  /api/tenant-memberships/{id}/           # Change member role
DELETE /api/tenant-memberships/{id}/           # Remove member (with conflict checks)
```

### Invitations

```
GET    /api/tenants/{uuid}/invitations/        # List invitations
POST   /api/tenants/{uuid}/invitations/        # Create invitation
PATCH  /api/tenants/{uuid}/invitations/{id}/   # Cancel invitation
POST   /api/invitations/accept/                # Accept invitation (by token)
POST   /api/invitations/resend/                # Resend invitation
```

### Public Discovery (Anonymous)

```
GET    /api/public/tenants/                    # Browse venues
GET    /api/public/tenants/{uuid}/             # View venue details
POST   /api/public/reservations/               # Create reservation (no auth)
GET    /api/public/reservations/availability/  # Check availability slots
```

### Tables & Zones

```
GET    /api/tables/                            # List tables
POST   /api/tables/                            # Create table(s)
POST   /api/tables/batch-create/               # Batch create
PATCH  /api/tables/batch-update/               # Batch update
DELETE /api/tables/batch-delete/               # Batch delete/deactivate
POST   /api/tables/{id}/transition-state/      # State machine transition
GET    /api/tables/{id}/current-session/       # Real-time table session
GET    /api/tables/{id}/real-time-status/      # Table status + queue context

GET    /api/table-zones/                       # List zones
GET    /api/table-tags/                        # List tags
GET    /api/table-features/                    # List features
GET    /api/table-groups/                      # List table groups
GET    /api/table-holds/                       # List holds
GET    /api/table-closures/                    # List closures
```

### Reservations

```
GET    /api/reservations/                      # List reservations
POST   /api/reservations/                      # Create reservation
GET    /api/reservations/availability/         # Check availability (staff)
POST   /api/reservations/{id}/confirm/         # Confirm reservation
POST   /api/reservations/{id}/seat/            # Seat customer
POST   /api/reservations/{id}/complete/        # Complete service
POST   /api/reservations/{id}/cancel/          # Cancel reservation
POST   /api/reservations/{id}/no-show/         # Mark no-show
POST   /api/reservations/batch-confirm/        # Batch confirm
POST   /api/reservations/batch-cancel/         # Batch cancel

GET    /api/v1/reservations/me/                # List my reservations (customer)
POST   /api/v1/reservations/me/{id}/cancel/    # Cancel my reservation

GET    /api/reservations/{id}/orders/          # List orders for reservation
POST   /api/reservations/{id}/create-order/    # Create order from reservation
```

### Queue Management

```
GET    /api/queues/                            # List queue tickets
POST   /api/queues/                            # Issue ticket
POST   /api/queues/{id}/call/                  # Call customer
POST   /api/queues/{id}/seat/                  # Seat customer
POST   /api/queues/{id}/cancel/                # Cancel ticket
POST   /api/queues/{id}/no-show/               # Mark no-show
POST   /api/queues/{id}/convert-to-reservation/ # Convert to reservation
GET    /api/queues/stats/                      # Queue statistics
```

### Orders & Payments

```
GET    /api/orders/                            # List orders
POST   /api/orders/                            # Create order
POST   /api/orders/{id}/serve/                 # Mark served
POST   /api/orders/{id}/pay/                   # Mark paid
POST   /api/orders/{id}/void/                  # Void order
POST   /api/orders/{id}/apply-discount/        # Apply discount (approval-aware)
GET    /api/orders/stats/                      # Order statistics

GET    /api/orders/{id}/bills/                 # List bills for order
POST   /api/orders/{id}/create-payment/        # Create payment from order
GET    /api/orders/{id}/payments/              # List payments for order
GET    /api/orders/{id}/payment-summary/       # Payment summary
GET    /api/orders/{id}/checks/                # List checks assigned to an order
POST   /api/orders/{id}/checks/                # Create a new check (split tab)
GET    /api/orders/{id}/checks/{check_id}/     # Retrieve check details + items
POST   /api/orders/{id}/checks/{check_id}/items/ # Move items into a specific check

GET    /api/payments/                          # List payments
POST   /api/payments/                          # Create payment
POST   /api/payments/{id}/complete/            # Complete payment
POST   /api/payments/{id}/fail/                # Mark failed
POST   /api/payments/{id}/refund/              # Process refund
GET    /api/payments/stats/                    # Payment statistics
```

Orders can maintain multiple simultaneous checks (tabs). Staff create, list, and move items between checks using the nested `/orders/{order_id}/checks/**` suite, and every payment API now takes a `check` GUID instead of a raw `order` reference so balances can be tracked per check.

### Menu Management

```
GET    /api/categories/                        # List categories
GET    /api/menus/                             # List menus
POST   /api/menus/{id}/clone/                  # Clone menu
GET    /api/items/                             # List menu items
POST   /api/items/batch-create/                # Batch create items
PATCH  /api/items/batch-update/                # Batch update items
DELETE /api/items/batch-delete/                # Batch delete items
PATCH  /api/items/{id}/update-stock/           # Update stock

GET    /api/item-collections/                  # List collections
POST   /api/item-collections/{id}/items/       # Add item to collection
DELETE /api/item-collections/{id}/items/{item_id}/ # Remove item
GET    /api/item-collections/{id}/preview/     # Smart collection preview

GET    /api/product-options/                   # List product options
GET    /api/product-variants/                  # List product variants
GET    /api/pre-modifiers/                     # List tenant pre-modifiers
POST   /api/pre-modifiers/                     # Create a pre-modifier definition
GET    /api/pre-modifier-groups/               # List pre-modifier groups
POST   /api/pre-modifier-groups/               # Create/update pre-modifier groups for options
```

### Revenue Centers

```
GET    /api/v1/revenue-centers/                # List revenue centers
POST   /api/v1/revenue-centers/                # Create revenue center
GET    /api/v1/revenue-centers/{id}/           # Retrieve revenue center
PUT    /api/v1/revenue-centers/{id}/           # Update revenue center
PATCH  /api/v1/revenue-centers/{id}/           # Partial update
DELETE /api/v1/revenue-centers/{id}/           # Soft delete (mark inactive)
GET    /api/v1/revenue-centers/{id}/sales-report/  # Per-center sales summary (date range)
```

### Coupons & Promotions

```
GET    /api/coupons/                           # List coupons
POST   /api/coupons/                           # Create coupon
POST   /api/coupons/{id}/issue/                # Issue to customer
POST   /api/coupons/{id}/issue-batch/          # Batch issue
GET    /api/coupons/{id}/usage-stats/          # Usage statistics

GET    /api/customers/{id}/coupons/            # List customer coupons
POST   /api/customers/{id}/coupons/{coupon_id}/use/ # Use coupon
GET    /api/v1/coupons/me/                     # My coupons (customer)

GET    /api/add-buys/available/                # Available add-buy offers
GET    /api/add-buys/preview/                  # Preview pricing
```

### Loyalty & Rewards

```
GET    /api/loyalty/programs/                  # List loyalty programs for the tenant
POST   /api/loyalty/programs/                  # Create or configure a loyalty program
GET    /api/customers/{id}/loyalty/            # Retrieve loyalty summary for a customer
POST   /api/customers/{id}/loyalty/earn/       # Manually award points
POST   /api/customers/{id}/loyalty/redeem/     # Redeem points and optionally apply to an order
GET    /api/customers/{id}/loyalty/transactions/ # List loyalty transactions for the customer
```

### Labor Management (NEW - 2025-11-08)

```
# Employee Management
GET    /api/v1/labor/employees/                     # List employees
POST   /api/v1/labor/employees/                     # Create employee
GET    /api/v1/labor/employees/{id}/                # Get employee details
PATCH  /api/v1/labor/employees/{id}/                # Update employee
DELETE /api/v1/labor/employees/{id}/                # Delete employee
PUT    /api/v1/labor/employees/{id}/archive/        # Archive employee (soft delete)
PUT    /api/v1/labor/employees/{id}/unarchive/      # Unarchive employee
PUT    /api/v1/labor/employees/{id}/jobs/           # Replace employee job assignments
PUT    /api/v1/labor/employees/{id}/wage-overrides/ # Set wage overrides
GET    /api/v1/labor/employees/{id}/shifts/         # List employee shifts
GET    /api/v1/labor/employees/{id}/time-entries/   # List employee time entries
GET    /api/v1/labor/employees/{id}/performance/    # Employee performance report

# Job (Position) Management
GET    /api/v1/labor/jobs/                          # List jobs
POST   /api/v1/labor/jobs/                          # Create job
GET    /api/v1/labor/jobs/{id}/                     # Get job details
PATCH  /api/v1/labor/jobs/{id}/                     # Update job
DELETE /api/v1/labor/jobs/{id}/                     # Delete job (soft delete)

# Shift Management
GET    /api/v1/labor/shifts/                        # List shifts
POST   /api/v1/labor/shifts/                        # Create shift
GET    /api/v1/labor/shifts/{id}/                   # Get shift details
PATCH  /api/v1/labor/shifts/{id}/                   # Update shift
DELETE /api/v1/labor/shifts/{id}/                   # Delete shift
POST   /api/v1/labor/shifts/{id}/start/             # Start shift (scheduled → in_progress)
POST   /api/v1/labor/shifts/{id}/end/               # End shift (in_progress → completed)
POST   /api/v1/labor/shifts/{id}/cancel/            # Cancel shift

# Time Entry Management
GET    /api/v1/labor/time-entries/                  # List time entries
POST   /api/v1/labor/time-entries/                  # Create time entry (Admin only)
GET    /api/v1/labor/time-entries/{id}/             # Get time entry details
PATCH  /api/v1/labor/time-entries/{id}/             # Update time entry (Admin only)
DELETE /api/v1/labor/time-entries/{id}/             # Delete time entry (Admin only)
POST   /api/v1/labor/time-entries/clock-in/         # Clock in (creates TimeEntry)
POST   /api/v1/labor/time-entries/clock-out/        # Clock out (completes TimeEntry)
POST   /api/v1/labor/time-entries/{id}/approve/     # Approve time entry (Manager+)

# Break Type Management
GET    /api/v1/labor/break-types/                   # List break types
POST   /api/v1/labor/break-types/                   # Create break type
GET    /api/v1/labor/break-types/{id}/              # Get break type details
PATCH  /api/v1/labor/break-types/{id}/              # Update break type
DELETE /api/v1/labor/break-types/{id}/              # Delete break type (soft delete)
```

### Financial Reports

```
GET    /api/reports/daily-sales/               # Daily sales snapshot (supports ?date=YYYY-MM-DD&revenue_center={id})
GET    /api/reports/revenue/                   # Revenue trends (?group_by=revenue_center plus day/week/month period)
GET    /api/reports/top-items/                 # Top-selling items
GET    /api/reports/staff-performance/         # Staff KPIs
GET    /api/reports/cash-flow/                 # Cash flow overview
GET    /api/reports/expense/                   # Expense summary
GET    /api/reports/profit/                    # Profit analysis
GET    /api/reports/export/daily-sales/        # Export daily sales (CSV/Excel)
GET    /api/reports/export/revenue/            # Export revenue (CSV/Excel)
```

### Cash Management

```
GET    /api/cash-drawers/                      # List drawers
POST   /api/cash-drawers/{id}/open/            # Open drawer (start shift)
POST   /api/cash-drawers/{id}/close/           # Close drawer (end shift)
POST   /api/cash-drawers/{id}/cash-in/         # Cash in (deposit)
POST   /api/cash-drawers/{id}/cash-out/        # Cash out (withdrawal)
POST   /api/cash-drawers/{id}/no-sale/         # Open without transaction
GET    /api/cash-drawers/{id}/balance/         # Current balance + warnings
GET    /api/cash-drawers/{id}/summary/         # Session statistics
GET    /api/cash-drawers/{id}/variance-report/ # Variance analysis

GET    /api/cash-drawer-sessions/              # List sessions
GET    /api/cash-entries/                      # List entries
POST   /api/cash-entries/{id}/void/            # Void entry (Manager+)
```

### E-Invoice System

```
GET    /api/invoice-tracks/                    # List tracks
POST   /api/invoice-tracks/                    # Create track
GET    /api/invoices/                          # List invoices
POST   /api/invoices/                          # Create invoice
POST   /api/invoices/{id}/void/                # Void invoice
GET    /api/invoice-allowances/                # List allowances
POST   /api/invoice-allowances/                # Create allowance
POST   /api/invoice-allowances/{id}/void/      # Void allowance
```

### Approval Workflow

```
GET    /api/approval-requests/                 # List approval requests
GET    /api/approval-requests/pending/         # Pending approvals (role-aware)
GET    /api/approval-requests/my-requests/     # My requests
POST   /api/approval-requests/{id}/approve/    # Approve request
POST   /api/approval-requests/{id}/reject/     # Reject request
POST   /api/approval-requests/{id}/cancel/     # Cancel request

GET    /api/approval-rules/                    # List rules
POST   /api/approval-rules/                    # Create rule (Owner)
```

### Settings

```
GET    /api/settings/general/                  # Get general settings (language, timezone, business day cutoff)
PATCH  /api/settings/general/                  # Update general settings
GET    /api/settings/reservations/             # Get reservation settings
PATCH  /api/settings/reservations/             # Update reservation settings
GET    /api/settings/closures/                 # Get closure settings
PATCH  /api/settings/closures/                 # Update closure settings
```

---

## Common Business Flows

### 1. Customer Discovery & Booking (Public Flow)

```
1. Browse venues          → GET /api/public/tenants/
2. View venue details     → GET /api/public/tenants/{uuid}/
3. Check availability     → GET /api/public/reservations/availability/
4. Create reservation     → POST /api/public/reservations/ (anonymous)
   OR register first      → POST /api/register/
   Then create            → POST /api/reservations/ (authenticated)
5. Manage reservations    → GET /api/v1/reservations/me/ (authenticated)
```

### 2. Staff Reservation Workflow

```
1. Check availability     → GET /api/reservations/availability/
2. Create reservation     → POST /api/reservations/
3. Confirm booking        → POST /api/reservations/{id}/confirm/
4. Seat customer          → POST /api/reservations/{id}/seat/
5. Create order           → POST /api/reservations/{id}/create-order/
6. Complete service       → POST /api/reservations/{id}/complete/
```

### 3. Walk-in Customer (Queue System)

```
1. Issue ticket           → POST /api/queues/
2. Monitor queue          → GET /api/queues/stats/
3. Call customer          → POST /api/queues/{id}/call/
4. Seat at table          → POST /api/queues/{id}/seat/
5. Convert to reservation → POST /api/queues/{id}/convert-to-reservation/
   (optional, for record-keeping)
```

### 4. Order & Payment Flow

```
1. Create order           → POST /api/orders/
2. Add items              → PATCH /api/orders/{id}/ (update items)
3. Serve order            → POST /api/orders/{id}/serve/
4. Create bill            → Auto-generated when payment needed
5. Process payment        → POST /api/orders/{id}/create-payment/
6. Complete payment       → POST /api/payments/{id}/complete/
7. Mark order paid        → POST /api/orders/{id}/pay/
```

### 5. Split Billing

```
1. Create bill            → Auto from order
2. Split equally          → POST /api/bills/{id}/split-equally/
   OR split by items      → POST /api/bills/{id}/split-by-items/
   OR split by ratio      → POST /api/orders/{id}/split/ (with ratio data)
3. Process payments       → POST /api/payments/ for each allocation
4. Merge if needed        → POST /api/bills/{id}/merge/
```

### 6. Coupon Redemption

```
1. Issue coupon           → POST /api/coupons/{id}/issue/
2. Check available        → GET /api/v1/coupons/me/ (customer)
3. Apply to order         → POST /api/orders/ (with applied_coupon FK)
4. System validates       → CouponService checks rules, inventory, expiry
5. Discount applied       → Order.discount_total calculated automatically
```

### 7. Approval Workflow (Discount Example)

```
1. Request discount       → POST /api/orders/{id}/apply-discount/
2. System checks rules    → ApprovalRuleEngine evaluates conditions
3a. If allowed            → Discount applied immediately (HTTP 200)
3b. If approval needed    → ApprovalRequest created (HTTP 202)
4. Approver reviews       → GET /api/approval-requests/pending/
5. Approve/Reject         → POST /api/approval-requests/{id}/approve/
6. System executes        → OrderDiscountService applies discount
```

### 8. Employee Labor Management (NEW - 2025-11-08)

```
1. Create shift           → POST /api/v1/labor/shifts/
2. Start shift            → POST /api/v1/labor/shifts/{id}/start/
3. Clock in               → POST /api/v1/labor/time-entries/clock-in/ (creates TimeEntry)
4. Work operations        → Normal order/payment/queue operations
5. Clock out              → POST /api/v1/labor/time-entries/clock-out/ (calculates wages)
6. Approve time entry     → POST /api/v1/labor/time-entries/{id}/approve/ (Manager+)
7. End shift              → POST /api/v1/labor/shifts/{id}/end/
8. Review performance     → GET /api/v1/labor/employees/{id}/performance/
   - Query params: start_date, end_date (defaults to last 30 days)
   - Returns: total_orders, regular_hours, overtime_hours, total_wage, efficiency
```

**Business Logic:**

- **Wage calculation**: Prioritizes `EmployeeJob.wage_override` > `Job.base_wage`
- **Overtime**: Hours > 8 are overtime (1.5x multiplier)
- **Time entry**: Auto-calculates regular_hours, overtime_hours, total_wage on clock-out
- **Employee archiving**: Sets `is_archived=True`, `archived_at=now()`, `termination_date`
- **Constraint**: One open TimeEntry per employee (clock_out=NULL unique constraint)
- **Performance metrics**: Orders/hour efficiency, total labor cost by employee

### 9. Invitation & Role Management

```
1. Create invitation      → POST /api/tenants/{uuid}/invitations/
2. Send to user           → Email/link with token (external system)
3. User accepts           → POST /api/invitations/accept/
4. Membership created     → TenantMembership with specified role
5. Change role later      → PATCH /api/tenant-memberships/{id}/
6. Remove member          → DELETE /api/tenant-memberships/{id}/
```

### 10. Multi-Tenant Context Switching

```
1. List memberships       → GET /api/tenants/my-memberships/
2. Switch context         → POST /api/users/switch-tenant/
3. Verify context         → GET /api/users/me/ (check current_tenant)
4. All operations         → Auto-scoped to current_tenant
```

---

## Status Transitions

### Reservation Status Flow

```
PENDING → BOOKED → CONFIRMED → SEATED → COMPLETED
   ↓         ↓         ↓         ↓
CANCELLED CANCELLED NO_SHOW  NO_SHOW
```

### Queue Status Flow

```
WAITING → CALLED → SEATED
   ↓        ↓
CANCELLED NO_SHOW
```

### Order Status Flow

```
PENDING → SERVED → PAID
   ↓        ↓
CANCELLED VOID
```

### Payment Status Flow

```
PENDING → PROCESSING → COMPLETED → PARTIALLY_REFUNDED → REFUNDED
   ↓          ↓
FAILED     FAILED
```

### Invoice Track Status Flow

```
DRAFT → ACTIVE → EXHAUSTED (auto)
   ↓       ↓
ARCHIVED SUSPENDED → ACTIVE
```

### Approval Request Status Flow

```
PENDING → APPROVED
   ↓         ↓
REJECTED  CANCELLED
   ↓         ↓
EXPIRED   EXPIRED
```

### Shift Status Flow (NEW - 2025-11-08)

```
SCHEDULED → IN_PROGRESS → COMPLETED
   ↓            ↓
CANCELLED   CANCELLED
```

**Note**: Completed shifts cannot be cancelled

---

## Data Boundaries & Security

### Tenant Isolation

- **All domain models** enforce `tenant` FK with CASCADE deletion
- **Queryset filtering**: All ViewSets auto-filter by `user.current_tenant`
- **Serializer validation**: Cross-tenant checks prevent data leakage
- **Object permissions**: ViewSet queryset scoping ensures isolation

### JWT Token Security

- Short-lived access tokens with refresh token rotation
- Secure signing key (configured in environment)
- Token includes user ID and tenant context
- Automatic tenant switching updates context

### Audit Trail

- `TenantAuditLog` records role changes, state transitions, destructive operations
- `TableStateTransition` tracks table state changes with actor
- `BillSplit.created_by` records split initiator
- `ApprovalRequest` captures requester and approver with timestamps

### Financial Controls

- **Expense tracking**: Tenant-scoped with optional membership attribution
- **Cash drawer variance**: Requires Admin approval if |variance| > 500
- **Payment integrity**: Validates bill status (rejects VOIDED bills)
- **Split billing**: Enforces total consistency with source bill
- **Invoice compliance**: One-to-one bill relationship with PROTECT

### Validation Rules

**Reservation:**
- Party size: `table.min_party_size ≤ party_size ≤ table.capacity`
- Max party size: `party_size ≤ tenant.max_party_size`
- Composition: `adults + children = party_size` (≥1 guest)
- Overlap: No conflicting reservations on same table
- Blocking: Check holds/closures/table state

**Order:**
- Cross-tenant: Order's table must belong to same tenant
- Financial: All amounts must be non-negative
- Status: Enforce valid transitions (no PAID → PENDING)
- Coupon: Validate applicable items/categories, usage limits

**Payment:**
- Amount: Must be positive (> 0)
- Refund: `refunded_amount ≤ amount`
- Cash: `cash_received ≥ amount`
- Line Pay: Requires `line_pay_transaction_id` for completion

**Invoice:**

- Financial: `sales_amount + tax_amount = total_amount`
- Uniqueness: One invoice per bill (one-to-one)
- Allowance: Cannot exceed `invoice.remaining_allowance_amount`

**Employee (NEW - 2025-11-08):**

- User link: One-to-one with User (PROTECT deletion)
- Employee number: Unique per tenant (excluding empty strings)
- Membership: Optional link to TenantMembership (must be same tenant)
- Job assignment: At least one job required (auto-provisions "default" job)
- Primary job: Exactly one primary job per employee (DB constraint)
- Archiving: Archived employees cannot be assigned new shifts

**Shift (NEW - 2025-11-08):**

- Time validation: `end_time > start_time`
- Cross-tenant: Employee and Job must belong to same tenant
- Archived check: Cannot assign shifts to archived employees
- Status transitions: scheduled → in_progress → completed (completed cannot be cancelled)

**TimeEntry (NEW - 2025-11-08):**

- Time validation: `clock_out > clock_in` (if clock_out exists)
- Cross-tenant: Employee, Job, and optional Shift must match tenant
- Shift consistency: Shift's employee and job must match TimeEntry
- Uniqueness: One open TimeEntry per employee (clock_out=NULL unique constraint)
- Wage calculation: Auto-computed on clock_out (regular + overtime)
- Break time: Subtracted from total worked hours (non-negative result)

---

## Location-Aware RBAC

### Brand & Location Hierarchy

- **Brand**: Marketing identity under tenant (soft-deletable, unique name/code)
- **Location**: Store-front metadata with optional brand link (timezone, coordinates)
- **Default provisioning**: Each tenant auto-creates default brand + location
- **Member access**: `TenantMembership.locations` (M2M) controls location scope

### Access Control

- **Owner/Admin**: Inherit all active locations automatically
- **Members**: Restricted to explicit `TenantMembership.locations` assignments
- **Helper method**: `membership.accessible_locations()` returns allowed queryset
- **Session context**: `User.current_location` complements `current_tenant`

### Implementation Roadmap (Models ready, API pending)

**Tables API**: Filter zones/tables/groups by accessible locations, enforce location FK on create/update

**Orders API**: Add location FK to orders/bills/payments (default from table/reservation), expose location filter

**Staff API**: Introduce `primary_location` + `locations` M2M, gate list/detail by membership scope

**Reports API**: Accept location filter (single/multi-select), cache keys must include location

---

## Implementation Notes for AI Agents

### When Creating/Updating Resources

1. **Always verify tenant context**: Check `user.current_tenant` is set
2. **Validate cross-tenant references**: All FKs must belong to same tenant
3. **Apply soft deletion**: Use `is_active=False` instead of hard delete where applicable
4. **Record audit trails**: Create `TenantAuditLog` entries for significant operations
5. **Handle atomicity**: Use database transactions for multi-step operations

### Common Pitfalls

- **Missing tenant filter**: Queries without tenant scoping leak data
- **Cross-tenant references**: FK validation must check tenant ownership
- **Permission bypass**: Always use permission classes, don't rely on client validation
- **State transition violations**: Enforce valid state flows in serializers
- **Pagination omission**: High-volume endpoints need pagination

### Testing Checklist

- [ ] Tenant isolation (users cannot access other tenant's data)
- [ ] Permission enforcement (role-based access control)
- [ ] Cross-tenant validation (FK references checked)
- [ ] State transition validation (invalid flows rejected)
- [ ] Financial calculations (amounts, refunds, splits)
- [ ] Concurrency handling (row-level locking where needed)
- [ ] Audit trail creation (significant operations logged)

### Debugging Tips

- Check `User.current_tenant` first when queries return empty
- Verify permission class is applied to ViewSet
- Use `select_related()`/`prefetch_related()` for performance
- Review `TenantAuditLog` for operation history
- Test with multiple tenants to catch isolation bugs

---

## References

- **API Conventions**: `docs/API_NAMING_CONVENTIONS.md`
- **Error Codes**: `docs/ERROR_CODES.md`
- **OpenAPI Schema**: `schema.yaml`
- **Project Repository**: Main branch reflects current implementation

---

## Change Log

- **2025-11-08**: Major labor management system refactor (Staff → Employee + Job + Shift + TimeEntry)
  - Implemented complete employee lifecycle management with archiving
  - Added job-based position system with wage configuration
  - Introduced shift scheduling with status workflow
  - Built time entry tracking with automatic wage calculation (regular + overtime)
  - Created break type configuration system
  - Integrated employee performance metrics (orders/hour, labor cost)
  - Established time entry approval workflow for managers
  - Updated Order/Bill/Payment/CashDrawer to use Employee FK
  - Maintained backward compatibility with Staff/StaffShift/StaffAttendance proxy models
  - New API: `/api/v1/labor/*` endpoints for comprehensive labor management
- **2025-11-07**: Document optimized for AI agent clarity
- **2025-11-06**: Added approval workflow system and cash management
- **2025-11-03**: Added add-buy promotions
- **2025-11-02**: Added product options and variants
- **2025-10-31**: Added item collections and split billing
- **2025-10-29**: Added e-invoice system and brand/location hierarchy
- **2025-10-27**: Added staff attribution and bill-payment integrity
- **2025-10-21**: Initial comprehensive documentation
