# Table Booking SaaS Backend

A comprehensive multi-tenant restaurant management platform built with Django REST Framework, featuring POS (Point of Sale), table reservation, and store management capabilities.

[中文版 README](README-CHT.md)

## Overview

This is a SaaS platform designed for restaurants and food service businesses, providing a complete solution for:

- Table and reservation management
- Walk-in queue system
- Food and beverage ordering (POS)
- Menu management with product options and variants
- Payment processing with multiple methods
- Staff scheduling and attendance tracking
- Business intelligence and reporting
- Taiwan e-invoice compliance
- Promotional campaigns (coupons and add-buy upsells)

## Technology Stack

- **Framework**: Django REST Framework 3.16.1
- **Python**: 3.12.7
- **Virtual Environment**: venv (directory: `env`)
- **Database**: PostgreSQL 17.6
- **Authentication**: SimpleJWT (access/refresh tokens)
- **API Documentation**: drf-spectacular (OpenAPI 3.0)
- **Testing Framework**: pytest-django
- **Platform**: Windows 11 (PowerShell)
- **Django Command**: `python manage.py`

## Core Features

### Authentication & Multi-Tenancy

- JWT-based authentication with access and refresh tokens
- Multi-tenant architecture with tenant isolation
- Role-based access control (Owner, Admin, Member)
- Invitation system for team management
- Support for users belonging to multiple tenants

### Table Management

- Complete table CRUD operations with zones, tags, and features
- Table grouping for larger parties
- Table holds and closures
- Real-time table state tracking
- Current session and real-time status APIs
- Soft deletion support

### Reservation System

- Full reservation lifecycle management
- Status transitions (Pending → Booked → Confirmed → Seated → Completed)
- Party composition tracking (adults/children)
- Overlap validation and conflict detection
- Public booking API for anonymous customers
- Self-service reservation management for authenticated users
- Integration with orders for seamless customer experience

### Walk-in Queue System

- Auto-generated ticket numbers
- Status workflow (Waiting → Called → Seated)
- Wait time tracking and queue position calculation
- Conversion to reservations
- Daily statistics

### Order & POS

- Food and beverage order management
- Line item tracking with product variants
- Status workflow (Pending → Served → Paid)
- Financial tracking (subtotal, tax, total)
- Bill management with split billing support
- Integration with reservations and tables
- Coupon and add-buy discount support

### Menu Management

- Menu categories and items
- Product options and variants (SKU-level configuration)
- Item collections (Custom, Smart, Combo types)
- Dietary preferences and allergen tracking
- Stock management and availability scheduling
- Bulk operations and menu cloning
- Nutrition information

### Payment Processing

- Multiple payment methods (Cash, Line Pay, Credit Card)
- Payment status workflow
- Refund management (full and partial)
- Payment statistics and financial tracking
- Split payment support
- Integration with e-invoice system

### Staff Management

- Employee directory with soft-deactivation
- Multi-role assignment
- Shift scheduling with duration tracking
- Attendance records with clock-in/out
- Performance tracking and KPIs

### Business Intelligence

- Daily sales snapshots
- Revenue trend analysis
- Top-selling item rankings
- Staff performance KPIs
- Cash flow tracking
- Expense visibility
- Profitability insights
- CSV/Excel exports

### E-Invoice System (Taiwan Compliance)

- Invoice track management with automatic number allocation
- Invoice issuance linked to bills and payments
- Allowance (credit note) support
- Configurable tax types (Taxed, Zero, Exempt)
- Buyer identifiers and carrier types
- Donation code support

### Promotions

- Coupon system with multiple discount types
- Usage limits and validity periods
- Add-buy upsell campaigns with A/B testing
- Inventory management for promotional items
- Customer-specific issuance and redemption

## API Naming Conventions

This project follows consistent naming standards across all HTTP interfaces:

- **URL paths**: `kebab-case` (e.g., `/api/menu-items/`, `/api/add-buy-collections/`)
- **JSON fields**: `snake_case` (e.g., `order_number`, `created_at`)
- **Query parameters**: `snake_case` (e.g., `?party_size=4`, `?date_from=2025-01-01`)
- **Custom DRF actions**: Explicitly set `url_path` to kebab-case format

For detailed guidelines, see [API_NAMING_CONVENTIONS.md](docs/API_NAMING_CONVENTIONS.md)

## Error Handling

All API errors return a standardized error response structure:

```json
{
  "error": {
    "code": "AUTHENTICATION_REQUIRED",
    "message": "Authentication credentials were not provided.",
    "details": [
      {
        "field": "email",
        "code": "required",
        "message": "Email is required"
      }
    ],
    "request_id": "req_abc123",
    "timestamp": "2025-11-03T12:34:56Z",
    "documentation_url": "https://docs.table-booking.app/errors/AUTHENTICATION_REQUIRED",
    "status": 401
  }
}
```

### Error Categories

- **Platform**: Authentication, authorization, validation, rate limiting, and infrastructure incidents
- **Business Logic**: Domain-specific constraints (inventory, payment, reservation conflicts)

For complete error code reference, see [ERROR_CODES.md](docs/ERROR_CODES.md)

## Role-Based Access Control

### Roles

1. **Owner**
   - Full control of the tenant
   - Can manage all settings and users
   - Can invite Admins and Members
   - Only one Owner per tenant

2. **Admin**
   - Restaurant operations management
   - Can manage tables, reservations, orders, and menus
   - Can invite Members (but not other Admins)
   - Cannot access Owner-level settings

3. **Member**
   - Daily operations
   - Can create and manage reservations, orders, and payments
   - Limited to assigned locations
   - Read-only access to some resources

4. **Customer** (via authenticated users)
   - Can create and manage their own reservations
   - Can view their own coupons
   - Email-based ownership validation

For detailed permission matrix, see [AGENTS.md](AGENTS.md)

## Installation & Setup

### Prerequisites

- Python 3.12.7
- PostgreSQL 17.6
- pip (Python package manager)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd table-booking-django
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv env
   env\Scripts\activate  # Windows
   # source env/bin/activate  # Linux/Mac
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   Create a `.env` file in the project root with the following variables:
   ```env
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=postgresql://user:password@localhost:5532/dbname
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## Testing

The project uses pytest-django for testing.

### Run all tests:
```bash
pytest
```

### Run with coverage:
```bash
pytest --cov=apps --cov-report=html
```

### Run specific test file:
```bash
pytest tests/test_error_handling.py
```

### Run tests for specific app:
```bash
pytest apps/reservations/tests/
```

Coverage reports will be generated in the `htmlcov/` directory.

## API Documentation

### OpenAPI Schema

The complete API schema is available in OpenAPI 3.0 format:

- **Schema file**: [schema.yaml](schema.yaml)
- **Interactive docs**: Available at `/api/schema/swagger-ui/` when running the server
- **ReDoc**: Available at `/api/schema/redoc/` when running the server

### Generate Schema

To regenerate the OpenAPI schema:

```bash
python manage.py spectacular --color --file schema.yaml
```

### Key API Endpoints

#### Authentication
- `POST /api/register/` - User registration
- `POST /api/register-and-create-tenant/` - Register and create tenant
- `POST /api/token/` - Obtain JWT tokens
- `POST /api/token/refresh/` - Refresh access token

#### Tenants & Users
- `GET /api/users/me/` - Get current user profile
- `POST /api/users/switch-tenant/` - Switch active tenant
- `GET /api/tenants/my-memberships/` - List user's tenant memberships
- `GET /api/tenants/{uuid}/` - Get tenant details

#### Tables & Reservations
- `GET /api/tables/` - List tables
- `POST /api/tables/` - Create table
- `GET /api/reservations/` - List reservations
- `POST /api/reservations/` - Create reservation
- `POST /api/public/reservations/` - Anonymous reservation booking
- `GET /api/v1/reservations/me/` - Self-service reservation management (legacy alias `/api/my/reservations/`)

#### Queues
- `GET /api/queues/` - List queue tickets
- `POST /api/queues/` - Create walk-in ticket
- `POST /api/queues/{id}/convert-to-reservation/` - Convert to reservation

#### Orders & Menu
- `GET /api/orders/` - List orders
- `POST /api/orders/` - Create order
- `GET /api/menus/` - List menus
- `GET /api/items/` - List menu items
- `POST /api/items/batch-create/` - Bulk create items

#### Payments
- `GET /api/payments/` - List payments
- `POST /api/payments/` - Create payment
- `POST /api/payments/{id}/refund/` - Process refund

#### Reports
- `GET /api/reports/daily-sales/` - Daily sales report
- `GET /api/reports/revenue/` - Revenue trends
- `GET /api/reports/staff-performance/` - Staff KPIs
- `GET /api/reports/export/daily-sales/` - Export daily sales

For complete API reference, see [AGENTS.md](AGENTS.md) or the OpenAPI schema.

## Project Structure

```
table-booking-django/
├── apps/
│   ├── common/          # Shared utilities and base models
│   ├── core/            # Core error handling and exceptions
│   ├── users/           # User authentication and management
│   ├── tenants/         # Tenant and membership management
│   ├── reservations/    # Table and reservation management
│   ├── queues/          # Walk-in queue system
│   ├── orders/          # Order and POS management
│   ├── menus/           # Menu and item management
│   ├── payments/        # Payment processing
│   ├── staff/           # Staff management and scheduling
│   ├── reports/         # Business intelligence and analytics
│   ├── einvoices/       # E-invoice system
│   └── coupons/         # Promotional campaigns
├── config/              # Django settings and configuration
├── docs/                # Documentation files
├── tests/               # Test files
├── schema.yaml          # OpenAPI specification
├── manage.py            # Django management script
└── requirements.txt     # Python dependencies
```

## Model Inheritance Hierarchy

### Common Mixins

- **TimeStamped**: Adds `created_at` and `updated_at` fields
- **SoftDeletable**: Adds `is_active` flag for soft deletion
- **TenantOwned**: Adds `tenant` FK with CASCADE deletion

### Key Models

- **Table**: TenantOwned + TimeStamped + SoftDeletable
- **Reservation**: TimeStamped (has tenant FK)
- **Order**: TenantOwned + TimeStamped
- **Payment**: TenantOwned + TimeStamped
- **Staff**: TenantOwned + TimeStamped + SoftDeletable
- **Invoice**: TenantOwned + TimeStamped

## Design Patterns

1. **Multi-Tenancy**: All tenant-owned models enforce tenant isolation
2. **Soft Deletion**: Critical resources use `is_active` flag
3. **Audit Trail**: All models track creation and modification timestamps
4. **Permission Classes**: Role-based access control at API level
5. **Queryset Filtering**: Automatic tenant filtering in all ViewSets
6. **Serializer Validation**: Cross-tenant checks and business rule enforcement
7. **API Pagination**: Standard pagination with configurable page size
8. **Localized Day Windows**: Timezone-aware date filtering

## Contributing

This is a private project. For questions or contributions, please contact the project maintainers.

## Architecture Documentation

For detailed system architecture, entity relationships, and API integration guides, see:

- [AGENTS.md](AGENTS.md) - Complete system architecture (English)
- [AGENTS-CHT.md](AGENTS-CHT.md) - Complete system architecture (Chinese)
- [API_NAMING_CONVENTIONS.md](docs/API_NAMING_CONVENTIONS.md) - API naming standards
- [ERROR_CODES.md](docs/ERROR_CODES.md) - Error code reference

## License

All rights reserved. This is proprietary software.
