declare namespace API {
  type AddBuyAvailabilityCollection = {
    id: number;
    code: string;
    name_translations: Record<string, any>;
    description_translations?: Record<string, any>;
    remaining_collection_quota: number;
    items: AddBuyAvailabilityItem[];
  };

  type AddBuyAvailabilityItem = {
    id: number;
    menu_item: number;
    product_variant: number;
    offer_price: string;
    list_price: string;
    discount_per_unit: string;
    remaining_global: number;
    remaining_order_allocation: number;
  };

  type AddBuyAvailabilityRequest = {
    items: OrderItemSnapshot[];
    ab_test_group?: string;
    ab_test_variant?: string;
  };

  type AddBuyAvailabilityResponse = {
    collections: AddBuyAvailabilityCollection[];
  };

  type AddBuyCollection = {
    id: number;
    tenant: number;
    /** Optional identifier for integrations or experimentation dashboards */
    code?: string;
    name_translations: Record<string, any>;
    description_translations?: Record<string, any>;
    /** Primary trigger category for this add-buy collection

* `ALWAYS` - Always
* `MENU_ITEM` - Specific menu items
* `ORDER_AMOUNT` - Order amount threshold
* `CATEGORY` - Menu category inclusion */
    trigger_type?: TriggerTypeEnum;
    /** Structured payload describing trigger specifics (e.g. quantity thresholds, match rules) */
    trigger_configuration?: any;
    /** Minimum order subtotal required when trigger_type=ORDER_AMOUNT */
    trigger_minimum_amount?: string;
    trigger_menu_items?: number[];
    /** Optional cap on how many add-buy items from this collection can be attached to a single order */
    max_quantity_per_order?: number;
    /** Manual ordering for display. Lower values appear first. */
    sort_order?: number;
    is_enabled?: boolean;
    /** Optional start datetime after which the collection becomes eligible */
    starts_at?: string;
    /** Optional end datetime after which the collection is no longer offered */
    ends_at?: string;
    /** Experiment group identifier (e.g., 'winter-upsell-experiment') */
    ab_test_group?: string;
    /** Variant bucket identifier (e.g., 'control', 'variant-a') */
    ab_test_variant?: string;
    /** Extensible metadata for BI systems */
    metadata?: any;
    items?: AddBuyItemNested[];
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type addBuyCollectionsDestroyParams = {
    /** A unique integer value identifying this Add-buy collection. */
    id: number;
  };

  type addBuyCollectionsItemsBatchCreateParams = {
    /** A unique integer value identifying this Add-buy collection. */
    id: number;
  };

  type addBuyCollectionsPartialUpdateParams = {
    /** A unique integer value identifying this Add-buy collection. */
    id: number;
  };

  type addBuyCollectionsRetrieveParams = {
    /** A unique integer value identifying this Add-buy collection. */
    id: number;
  };

  type addBuyCollectionsStatisticsRetrieveParams = {
    /** A unique integer value identifying this Add-buy collection. */
    id: number;
  };

  type addBuyCollectionsUpdateParams = {
    /** A unique integer value identifying this Add-buy collection. */
    id: number;
  };

  type AddBuyItem = {
    id: number;
    collection: number;
    menu_item: number;
    product_variant?: number;
    /** Determines how the add-buy price will be calculated

* `ORIGINAL` - Original price
* `DISCOUNT_RATE` - Discount rate
* `FIXED_PRICE` - Fixed add-on price */
    price_type?: PriceTypeEnum;
    /** Discount rate applied to the base price (0.15 = 15% off) when price_type=DISCOUNT_RATE */
    discount_rate?: string;
    /** Final price to charge when price_type=FIXED_PRICE */
    fixed_price?: string;
    /** Optional per-order limit for this specific item */
    max_quantity_per_order?: number;
    /** Global cap on how many times this item can be sold as an add-buy */
    inventory_limit?: number;
    /** Number of add-buy units already consumed by orders */
    inventory_consumed: number;
    sort_order?: number;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type AddBuyItemNested = {
    id: number;
    collection?: number;
    menu_item: number;
    product_variant?: number;
    /** Determines how the add-buy price will be calculated

* `ORIGINAL` - Original price
* `DISCOUNT_RATE` - Discount rate
* `FIXED_PRICE` - Fixed add-on price */
    price_type?: PriceTypeEnum;
    /** Discount rate applied to the base price (0.15 = 15% off) when price_type=DISCOUNT_RATE */
    discount_rate?: string;
    /** Final price to charge when price_type=FIXED_PRICE */
    fixed_price?: string;
    /** Optional per-order limit for this specific item */
    max_quantity_per_order?: number;
    /** Global cap on how many times this item can be sold as an add-buy */
    inventory_limit?: number;
    /** Number of add-buy units already consumed by orders */
    inventory_consumed: number;
    sort_order?: number;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type addBuyItemsDestroyParams = {
    /** A unique integer value identifying this Add-buy item. */
    id: number;
  };

  type addBuyItemsPartialUpdateParams = {
    /** A unique integer value identifying this Add-buy item. */
    id: number;
  };

  type addBuyItemsRetrieveParams = {
    /** A unique integer value identifying this Add-buy item. */
    id: number;
  };

  type addBuyItemsUpdateParams = {
    /** A unique integer value identifying this Add-buy item. */
    id: number;
  };

  type AddBuyPreviewRequest = {
    items: OrderItemSnapshot[];
    selections: AddBuyPreviewSelection[];
    ab_test_group?: string;
    ab_test_variant?: string;
  };

  type AddBuyPreviewResponse = {
    base_subtotal: string;
    add_buy_subtotal: string;
    add_buy_discount_total: string;
    estimated_total: string;
    selections: AddBuyPreviewSelectionResult[];
  };

  type AddBuyPreviewSelection = {
    add_buy_item: number;
    quantity: number;
  };

  type AddBuyPreviewSelectionResult = {
    add_buy_item: number;
    add_buy_collection: number;
    quantity: number;
    unit_price: string;
    list_price: string;
    discount_total: string;
    subtotal: string;
  };

  type ApprovalRequest = {
    id: string;
    tenant: number;
    request_type: ApprovalRequestTypeEnum;
    status: ApprovalRequestStatusEnum;
    requested_by: number;
    requested_by_email: string;
    requested_at: string;
    reason?: string;
    request_data?: any;
    required_roles: any;
    approved_by: number;
    approved_by_email: string;
    approved_at: string;
    rejection_reason: string;
    metadata: any;
    resolved_at: string;
    expires_at: string;
    target: Record<string, any>;
    object_id: string;
    content_type: number;
  };

  type ApprovalRequestDetail = {
    id: string;
    tenant: number;
    request_type: ApprovalRequestTypeEnum;
    status: ApprovalRequestStatusEnum;
    requested_by: number;
    requested_by_email: string;
    requested_at: string;
    reason?: string;
    request_data?: any;
    required_roles: any;
    approved_by: number;
    approved_by_email: string;
    approved_at: string;
    rejection_reason: string;
    metadata: any;
    resolved_at: string;
    expires_at: string;
    target: Record<string, any>;
    object_id: string;
    content_type: number;
  };

  type ApprovalRequestReject = {
    reason?: string;
    metadata?: Record<string, any>;
  };

  type approvalRequestsApproveCreateParams = {
    /** A UUID string identifying this approval request. */
    id: string;
  };

  type approvalRequestsCancelCreateParams = {
    /** A UUID string identifying this approval request. */
    id: string;
  };

  type approvalRequestsListParams = {
    /** When set to true, only requests submitted by the current user are returned. */
    mine?: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by request type. */
    request_type?: string;
    /** Filter by approval status. */
    status?: string;
  };

  type approvalRequestsMyRequestsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type approvalRequestsPendingListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type approvalRequestsRejectCreateParams = {
    /** A UUID string identifying this approval request. */
    id: string;
  };

  type approvalRequestsRetrieveParams = {
    /** A UUID string identifying this approval request. */
    id: string;
  };

  type ApprovalRequestStatusEnum =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | "EXPIRED";

  type ApprovalRequestTypeEnum =
    | "DISCOUNT"
    | "ORDER_VOID"
    | "REFUND"
    | "PRICE_CHANGE"
    | "ATTENDANCE_OVERRIDE";

  type ApprovalRoleEnum = "OWNER" | "ADMIN" | "MANAGER";

  type ApprovalRule = {
    id: number;
    tenant: number;
    rule_type: ApprovalRequestTypeEnum;
    condition?: any;
    required_role: ApprovalRoleEnum;
    is_active?: boolean;
    priority?: number;
    description?: string;
    metadata?: any;
    created_at: string;
    updated_at: string;
  };

  type approvalRulesDestroyParams = {
    /** A unique integer value identifying this approval rule. */
    id: number;
  };

  type approvalRulesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type approvalRulesPartialUpdateParams = {
    /** A unique integer value identifying this approval rule. */
    id: number;
  };

  type approvalRulesRetrieveParams = {
    /** A unique integer value identifying this approval rule. */
    id: number;
  };

  type approvalRulesUpdateParams = {
    /** A unique integer value identifying this approval rule. */
    id: number;
  };

  type Bill = {
    id: number;
    tenant: number;
    order: number;
    order_number: string;
    table_number: string;
    customer_name: string;
    bill_number: string;
    status?: BillStatusEnum;
    /** Tax rate as percentage (e.g., 5.00 for 5%) */
    tax_rate?: string;
    /** Service charge rate as percentage (e.g., 10.00 for 10%) */
    service_charge_rate?: string;
    /** Fixed discount amount applied to the bill */
    discount_amount?: string;
    /** Order subtotal before any charges or discounts */
    subtotal: string;
    /** Calculated tax amount based on tax_rate */
    tax_amount: string;
    /** Calculated service charge based on service_charge_rate */
    service_charge_amount: string;
    /** Final amount: subtotal + tax + service_charge - discount */
    grand_total: string;
    issued_at: string;
    voided_at: string;
    note?: string;
    staff?: number;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
    net_amount: string;
    is_voided: boolean;
    invoice_id: number;
    invoice_number: string;
    invoice_status: string;
    created_at: string;
    updated_at: string;
  };

  type BillCreatePayment = {
    /** Payment method: CASH, LINE_PAY, or CREDIT_CARD

* `CASH` - Cash
* `LINE_PAY` - Line Pay
* `CREDIT_CARD` - Credit Card */
    payment_method: PaymentMethodEnum;
    /** Payment amount */
    amount: string;
    /** Payment status (defaults to PENDING)

* `PENDING` - Pending
* `PROCESSING` - Processing
* `COMPLETED` - Completed
* `FAILED` - Failed
* `REFUNDED` - Refunded
* `PARTIALLY_REFUNDED` - Partially Refunded */
    status?: PaymentStatusEnum;
    /** Amount received from customer (for CASH) */
    cash_received?: string;
    /** Change to return (auto-calculated for CASH) */
    cash_change?: string;
    /** Line Pay transaction ID (required for completed LINE_PAY) */
    line_pay_transaction_id?: string;
    /** Last 4 digits of card (for CREDIT_CARD) */
    card_last_four?: string;
    /** Card brand like Visa, Mastercard (for CREDIT_CARD) */
    card_brand?: string;
    /** External payment gateway transaction ID */
    external_transaction_id?: string;
    /** Optional payment note */
    note?: string;
    /** Employee who processed the payment */
    staff_name?: string;
  };

  type BillList = {
    id: number;
    bill_number: string;
    order: number;
    order_number: string;
    table_number: string;
    customer_name: string;
    status?: BillStatusEnum;
    /** Final amount: subtotal + tax + service_charge - discount */
    grand_total?: string;
    net_amount: string;
    invoice_number: string;
    issued_at?: string;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
  };

  type BillMerge = {
    bill_ids: number[];
  };

  type BillPaymentSummary = {
    bill_id: number;
    bill_number: string;
    bill_total: string;
    total_paid: string;
    total_refunded: string;
    net_paid: string;
    outstanding_balance: string;
    is_fully_paid: boolean;
    payment_count: number;
    completed_payments: number;
    pending_payments: number;
    failed_payments: number;
    refunded_payments: number;
    payments: any[];
  };

  type billsCreatePaymentCreateParams = {
    id: string;
  };

  type billsDestroyParams = {
    id: string;
  };

  type billsListParams = {
    /** Filter by issue date (YYYY-MM-DD) */
    date?: string;
    /** Filter by issue date <= end_date (YYYY-MM-DD) */
    end_date?: string;
    /** Filter by order ID */
    order?: number;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by issue date >= start_date (YYYY-MM-DD) */
    start_date?: string;
    /** Filter by status (ISSUED, VOIDED) */
    status?: string;
  };

  type billsMergeCreateParams = {
    id: string;
  };

  type billsPartialUpdateParams = {
    id: string;
  };

  type billsPaymentsListParams = {
    id: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type billsPaymentSummaryRetrieveParams = {
    id: string;
  };

  type billsPdfRetrieveParams = {
    id: string;
  };

  type BillSplit = {
    id: number;
    split_number: string;
    split_type: OrderBillSplitTypeEnum;
    status: OrderBillSplitStatusEnum;
    /** Total amount of the source bill */
    original_total: string;
    /** Total amount distributed to child bills within this split */
    allocated_total: string;
    metadata: any;
    created_at: string;
    updated_at: string;
    source_bill_id: number;
    source_bill_number: string;
    created_by_membership: number;
    allocations: BillSplitAllocation[];
  };

  type BillSplitAllocation = {
    id: number;
    /** Display label for the participant or party responsible for this share */
    label: string;
    amount: string;
    /** Percentage share when ratio-based splitting is used */
    percentage: string;
    status: OrderBillSplitAllocationStatusEnum;
    bill_id: number;
    bill_number: string;
    metadata: any;
    paid_amount: string;
    outstanding_amount: string;
    created_at: string;
    updated_at: string;
  };

  type BillSplitCreate = {
    split_type: OrderBillSplitTypeEnum;
    participants: Record<string, any>[];
    options?: Record<string, any>;
  };

  type billsRetrieveParams = {
    id: string;
  };

  type billsSplitByItemsCreateParams = {
    id: string;
  };

  type billsSplitEquallyCreateParams = {
    id: string;
  };

  type billsSplitsRatioPartialUpdateParams = {
    id: string;
    split_id: string;
  };

  type BillStatusEnum = "ISSUED" | "SPLIT" | "VOIDED";

  type billsUpdateParams = {
    id: string;
  };

  type billsVoidCreateParams = {
    id: string;
  };

  type BillVoid = {
    /** Reason for voiding the bill */
    note?: string;
  };

  type BreakType = {
    id: number;
    tenant: number;
    name: string;
    /** Duration in minutes. */
    duration: number;
    is_paid?: boolean;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type CashDrawer = {
    id: number;
    tenant: number;
    /** Name of the cash drawer (e.g., 'Counter Register 1') */
    name: string;
    /** Physical location description */
    location?: string;
    /** Associated device identifier (optional) */
    device?: string;
    status: CashDrawerStatusEnum;
    /** Whether this drawer is currently in use */
    is_active?: boolean;
    /** Starting balance for the current session */
    opening_balance?: string;
    /** Current calculated balance */
    current_balance: string;
    /** Expected balance based on transactions */
    expected_balance: string;
    /** When the current session started */
    opened_at: string;
    opened_by?: number;
    opened_by_name: string;
    /** When the current session ended */
    closed_at: string;
    closed_by?: number;
    closed_by_name: string;
    created_at: string;
    updated_at: string;
  };

  type cashDrawersBalanceRetrieveParams = {
    id: string;
  };

  type cashDrawersCashInCreateParams = {
    id: string;
  };

  type cashDrawersCashOutCreateParams = {
    id: string;
  };

  type cashDrawersCloseCreateParams = {
    id: string;
  };

  type cashDrawersDestroyParams = {
    id: string;
  };

  type cashDrawersEntriesListParams = {
    /** Filter by date (YYYY-MM-DD) */
    date?: string;
    /** Filter by end date (YYYY-MM-DD) */
    end_date?: string;
    id: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by start date (YYYY-MM-DD) */
    start_date?: string;
  };

  type CashDrawerSession = {
    id: number;
    cash_drawer: number;
    cash_drawer_name: string;
    employee?: number;
    employee_name: string;
    started_at: string;
    ended_at?: string;
    opening_balance: string;
    /** Actual counted balance at session end */
    closing_balance?: string;
    /** Calculated expected balance */
    expected_balance: string;
    /** Difference between closing and expected (closing - expected) */
    variance?: string;
    /** Total cash received during session */
    total_cash_in: string;
    /** Total cash paid out during session */
    total_cash_out: string;
    status?: CashDrawerSessionStatusEnum;
    /** Currency denomination breakdown at closing */
    denominations?: any;
    reconciled_at?: string;
    reconciled_by?: number;
    reconciled_by_name: string;
    reconciliation_note?: string;
    duration_minutes: number;
    is_open: boolean;
    created_at: string;
    updated_at: string;
  };

  type CashDrawerSessionList = {
    id: number;
    cash_drawer_name: string;
    employee_name: string;
    started_at?: string;
    ended_at?: string;
    status?: CashDrawerSessionStatusEnum;
    opening_balance: string;
    /** Actual counted balance at session end */
    closing_balance?: string;
    /** Difference between closing and expected (closing - expected) */
    variance?: string;
  };

  type cashDrawerSessionsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type cashDrawerSessionsRetrieveParams = {
    id: string;
  };

  type CashDrawerSessionStatusEnum = "OPEN" | "CLOSED" | "RECONCILED";

  type cashDrawersListParams = {
    /** Filter by active status */
    is_active?: boolean;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by status (OPEN, CLOSED) */
    status?: string;
  };

  type cashDrawersNoSaleCreateParams = {
    id: string;
  };

  type cashDrawersOpenCreateParams = {
    id: string;
  };

  type cashDrawersPartialUpdateParams = {
    id: string;
  };

  type cashDrawersRetrieveParams = {
    id: string;
  };

  type cashDrawersSummaryRetrieveParams = {
    id: string;
  };

  type CashDrawerStatusEnum = "OPEN" | "CLOSED";

  type cashDrawersUpdateParams = {
    id: string;
  };

  type cashDrawersVarianceReportRetrieveParams = {
    /** Filter by end date (YYYY-MM-DD) */
    end_date?: string;
    id: string;
    /** Filter by start date (YYYY-MM-DD) */
    start_date?: string;
  };

  type cashEntriesDestroyParams = {
    id: string;
  };

  type cashEntriesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type cashEntriesPartialUpdateParams = {
    id: string;
  };

  type cashEntriesRetrieveParams = {
    id: string;
  };

  type cashEntriesUpdateParams = {
    id: string;
  };

  type cashEntriesVoidCreateParams = {
    id: string;
  };

  type CashEntry = {
    id: number;
    tenant: number;
    cash_drawer: number;
    cash_drawer_name: string;
    session?: number;
    entry_type: CashEntryTypeEnum;
    /** Amount (positive for cash in, negative for cash out) */
    amount: string;
    employee?: number;
    employee_name: string;
    /** Business date for reporting purposes */
    business_date: string;
    /** Reason for this cash entry */
    reason?: string;
    note?: string;
    reference_type?: number;
    reference_id?: number;
    /** Device that created this entry */
    created_device?: string;
    /** Whether this entry has been voided */
    is_void: boolean;
    voided_at: string;
    voided_by?: number;
    voided_by_name: string;
    void_reason?: string;
    is_cash_in: boolean;
    is_cash_out: boolean;
    created_at: string;
    updated_at: string;
  };

  type CashEntryList = {
    id: number;
    cash_drawer_name: string;
    entry_type: CashEntryTypeEnum;
    /** Amount (positive for cash in, negative for cash out) */
    amount: string;
    employee_name: string;
    /** Business date for reporting purposes */
    business_date: string;
    /** Reason for this cash entry */
    reason?: string;
    /** Whether this entry has been voided */
    is_void?: boolean;
    created_at: string;
  };

  type CashEntryTypeEnum =
    | "CASH_IN"
    | "SALE"
    | "CASH_OUT"
    | "NO_SALE"
    | "PETTY_CASH"
    | "SUPPLIER_PAYMENT"
    | "TIP_OUT"
    | "REFUND"
    | "BANK_DEPOSIT"
    | "CHANGE_FUND"
    | "OTHER";

  type CashFlowBucket = {
    date: string;
    incoming: string;
    outgoing: string;
    net: string;
  };

  type CashFlowReport = {
    start_date: string;
    end_date: string;
    buckets: CashFlowBucket[];
    totals: Record<string, any>;
  };

  type CashIn = {
    amount: string;
    reason: string;
    note?: string;
  };

  type CashOut = {
    amount: string;
    reason: string;
    /** Reference ID (e.g., expense UUID) */
    reference?: string;
    note?: string;
  };

  type categoriesDestroyParams = {
    id: string;
  };

  type categoriesListParams = {
    /** Filter by active status */
    is_active?: boolean;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type categoriesPartialUpdateParams = {
    id: string;
  };

  type categoriesRetrieveParams = {
    id: string;
  };

  type categoriesUpdateParams = {
    id: string;
  };

  type CategoryEnum =
    | "payroll"
    | "rent"
    | "utilities"
    | "supplies"
    | "maintenance"
    | "marketing"
    | "other";

  type CloseDrawer = {
    /** Actual counted balance at session end */
    closing_balance: string;
    /** Currency denomination breakdown (optional) */
    denominations?: any;
    /** Optional closing note */
    note?: string;
  };

  type ClosurePeriod = {
    start_date: string;
    end_date?: string;
    label?: string;
  };

  type Coupon = {
    id: number;
    tenant: number;
    code: string;
    name: string;
    description?: string;
    discount_type?: DiscountTypeEnum;
    discount_value: string;
    min_purchase_amount?: string;
    /** Total number of times this coupon can be used across all customers. */
    usage_limit?: number;
    /** Number of successful redemptions for this coupon. */
    usage_count: number;
    /** Maximum number of times a single customer may redeem this coupon. */
    per_customer_limit?: number;
    valid_from?: string;
    valid_to?: string;
    is_active?: boolean;
    applicable_items?: number[];
    applicable_categories?: number[];
    metadata?: any;
    created_at: string;
    updated_at: string;
  };

  type couponsDestroyParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type couponsIssueBatchCreateParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type couponsIssueCreateParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type couponsMeListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type couponsPartialUpdateParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type couponsRetrieveParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type couponsUpdateParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type couponsUsageStatsRetrieveParams = {
    /** A unique integer value identifying this coupon. */
    id: number;
  };

  type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    first_reservation: string;
    last_reservation: string;
    reservation_count: number;
    last_status: string;
    status_breakdown: Record<string, any>;
  };

  type CustomerCoupon = {
    id: number;
    coupon: number;
    coupon_code: string;
    coupon_name: string;
    discount_type: string;
    discount_value: string;
    status: CustomerCouponStatusEnum;
    issued_at: string;
    used_at: string;
    expired_at: string;
    valid_from: string;
    valid_to: string;
    order: number;
  };

  type CustomerCouponStatusEnum = "AVAILABLE" | "USED" | "EXPIRED";

  type CustomerHistory = {
    id: string;
    name: string;
    email: string;
    phone: string;
    first_reservation: string;
    last_reservation: string;
    reservation_count: number;
    last_status: string;
    status_breakdown: Record<string, any>;
    reservations: ReservationList[];
  };

  type customersCouponsRetrieveParams = {
    id: string;
  };

  type customersCouponsUseCreateParams = {
    coupon_id: string;
    id: string;
  };

  type customersHistoryRetrieveParams = {
    id: string;
  };

  type customersListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type DailySalesOrders = {
    total: number;
    paid: number;
    served: number;
    cancelled: number;
    void: number;
  };

  type DailySalesPayments = {
    cash: string;
    line_pay: string;
    credit_card: string;
  };

  type DailySalesReport = {
    date: string;
    orders: DailySalesOrders;
    revenue: DailySalesRevenue;
    payments: DailySalesPayments;
    top_items: DailySalesTopItem[];
  };

  type DailySalesRevenue = {
    gross: string;
    refunds: string;
    net: string;
    average_ticket: string;
  };

  type DailySalesTopItem = {
    name: string;
    category: string;
    quantity: number;
    total: string;
  };

  type DiscountTypeEnum = "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_ITEM";

  type einvoicesAllowancesDestroyParams = {
    id: string;
  };

  type einvoicesAllowancesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type einvoicesAllowancesPartialUpdateParams = {
    id: string;
  };

  type einvoicesAllowancesRetrieveParams = {
    id: string;
  };

  type einvoicesAllowancesUpdateParams = {
    id: string;
  };

  type einvoicesAllowancesVoidCreateParams = {
    id: string;
  };

  type einvoicesInvoicesDestroyParams = {
    id: string;
  };

  type einvoicesInvoicesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type einvoicesInvoicesPartialUpdateParams = {
    id: string;
  };

  type einvoicesInvoicesRetrieveParams = {
    id: string;
  };

  type einvoicesInvoicesUpdateParams = {
    id: string;
  };

  type einvoicesInvoicesVoidCreateParams = {
    id: string;
  };

  type EinvoiceStatusEnum = "ISSUED" | "VOIDED";

  type einvoicesTracksDestroyParams = {
    id: string;
  };

  type einvoicesTracksListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type einvoicesTracksPartialUpdateParams = {
    id: string;
  };

  type einvoicesTracksRetrieveParams = {
    id: string;
  };

  type einvoicesTracksSetDefaultCreateParams = {
    id: string;
  };

  type einvoicesTracksUpdateParams = {
    id: string;
  };

  type Employee = {
    id: number;
    /** Reference for payroll/HR integrations. */
    external_id?: string;
    tenant: number;
    user: number;
    user_name: string;
    user_email: string;
    employee_number?: string;
    hire_date?: string;
    termination_date?: string;
    is_archived: boolean;
    archived_at: string;
    jobs: Job[];
    job_ids?: number[];
    created_at: string;
    updated_at: string;
  };

  type ErrorDetail = {
    /** Application-specific error code */
    code: string;
    /** Translated, human-readable error message */
    message: string;
    /** Structured validation or context details */
    details?: ErrorFieldDetail[];
    /** Correlates the request across systems */
    request_id: string;
    /** ISO 8601 timestamp indicating when the error occurred */
    timestamp: string;
    /** Link to documentation for this error code */
    documentation_url: string;
    /** HTTP status code associated with the error */
    status: number;
  };

  type ErrorFieldDetail = {
    /** Field associated with the error */
    field?: string;
    /** Machine-readable detail code */
    code: string;
    /** Human-readable detail message */
    message: string;
  };

  type ErrorResponse = {
    error: ErrorDetail;
  };

  type Expense = {
    id: number;
    expense_date: string;
    category: CategoryEnum;
    description: string;
    amount: string;
    payment_method: ExpensePaymentMethodEnum;
    note: string;
    /** Tenant membership that recorded this expense */
    recorded_by: number;
    created_at: string;
    updated_at: string;
  };

  type ExpensePaymentMethodEnum =
    | "cash"
    | "bank_transfer"
    | "credit_card"
    | "line_pay"
    | "other";

  type expensesDestroyParams = {
    id: string;
  };

  type expensesListParams = {
    /** Filter by expense category. */
    category?:
      | "maintenance"
      | "marketing"
      | "other"
      | "payroll"
      | "rent"
      | "supplies"
      | "utilities";
    /** Filter up to this date (YYYY-MM-DD). */
    end_date?: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by payment method. */
    payment_method?:
      | "bank_transfer"
      | "cash"
      | "credit_card"
      | "line_pay"
      | "other";
    /** Case-insensitive search on description. */
    search?: string;
    /** Filter from this date (YYYY-MM-DD). */
    start_date?: string;
  };

  type expensesPartialUpdateParams = {
    id: string;
  };

  type expensesRetrieveParams = {
    id: string;
  };

  type ExpenseSummary = {
    start_date: string;
    end_date: string;
    total: string;
    by_category: Record<string, any>;
    expenses: Expense[];
  };

  type expensesUpdateParams = {
    id: string;
  };

  type ExpenseWrite = {
    id: number;
    expense_date: string;
    category?: CategoryEnum;
    description: string;
    amount: string;
    payment_method?: ExpensePaymentMethodEnum;
    note?: string;
    recorded_by: number;
    created_at: string;
    updated_at: string;
  };

  type InvitationStatusEnum = "PENDING" | "ACCEPTED" | "CANCELLED" | "EXPIRED";

  type Invoice = {
    id: number;
    tenant: number;
    track?: number;
    track_id: number;
    track_prefix: string;
    track_year_month: string;
    bill: number;
    bill_id: number;
    bill_number: string;
    payment?: number;
    payment_id: number;
    payment_number: string;
    invoice_number: string;
    issue_date?: string;
    status: EinvoiceStatusEnum;
    tax_type: InvoiceTaxTypeEnum;
    currency: string;
    sales_amount: string;
    tax_amount: string;
    total_amount: string;
    /** Uniform number for B2B invoices. */
    buyer_identifier?: string;
    buyer_name?: string;
    buyer_email?: string;
    /** Carrier type (e.g. /U, /C, CT, by tax authority specification). */
    carrier_type?: string;
    /** Carrier identifier (phone barcode, natural person certificate, etc.). */
    carrier_number?: string;
    /** Donation code for charity donations. */
    donation_code?: string;
    print_mark?: InvoicePrintMarkEnum;
    remark?: string;
    void_reason: string;
    voided_at: string;
    metadata?: any;
    remaining_allowance_amount: string;
    allowances: InvoiceAllowance[];
    created_at: string;
    updated_at: string;
  };

  type InvoiceAllowance = {
    id: number;
    tenant: number;
    invoice: number;
    invoice_number: string;
    allowance_number: string;
    issue_date: string;
    status: EinvoiceStatusEnum;
    sales_amount: string;
    tax_amount: string;
    total_amount: string;
    reason?: string;
    remark?: string;
    refund_payment: number;
    refund_payment_number: string;
    void_reason: string;
    voided_at: string;
    metadata: any;
    created_at: string;
    updated_at: string;
  };

  type InvoiceAllowanceCreate = {
    invoice: number;
    total_amount: string;
    tax_amount: string;
    reason?: string;
    remark?: string;
    refund_payment?: number;
    metadata?: Record<string, any>;
    issue_date?: string;
  };

  type InvoiceAllowanceVoid = {
    reason?: string;
  };

  type InvoicePrintMarkEnum = "Y" | "N";

  type InvoiceTaxTypeEnum = "TAXED" | "ZERO" | "EXEMPT";

  type InvoiceTrack = {
    id: number;
    tenant: number;
    /** Two-letter prefix assigned by the tax authority (e.g. AB). */
    prefix: string;
    /** Bi-monthly period represented in YYYYMM (e.g. 202501 for Jan-Feb). */
    year_month: string;
    /** First numeric number of the track (1-8 digits). */
    start_number: number;
    /** Last numeric number of the track (inclusive). */
    end_number: number;
    /** Last numeric value used from this track. Null indicates none issued yet. */
    last_issued_number: number;
    status?: InvoiceTrackStatusEnum;
    /** Optional activation date; invoices cannot be issued before this date. */
    activation_date?: string;
    /** Optional expiration date; invoices cannot be issued after this date. */
    expiration_date?: string;
    /** Marks the default track to use when issuing invoices automatically. */
    is_default?: boolean;
    notes?: string;
    created_at: string;
    updated_at: string;
  };

  type InvoiceTrackStatusEnum =
    | "DRAFT"
    | "ACTIVE"
    | "SUSPENDED"
    | "EXHAUSTED"
    | "ARCHIVED";

  type ItemCollectionDetail = {
    id: number;
    tenant: number;
    name: string;
    description?: string;
    type: TypeEnum;
    is_active?: boolean;
    is_currently_available: boolean;
    display_order?: number;
    available_from?: string;
    available_to?: string;
    item_count: number;
    rule_count: number;
    created_at: string;
    updated_at: string;
    items: ItemCollectionItemRead[];
    rules: ItemCollectionRule[];
  };

  type ItemCollectionItemRead = {
    id: number;
    item: MenuItemNested;
    position: number;
    source: SourceEnum;
    created_at: string;
    updated_at: string;
  };

  type ItemCollectionList = {
    id: number;
    tenant: number;
    name: string;
    description?: string;
    type: TypeEnum;
    is_active?: boolean;
    is_currently_available: boolean;
    display_order?: number;
    available_from?: string;
    available_to?: string;
    item_count: number;
    rule_count: number;
    created_at: string;
    updated_at: string;
  };

  type ItemCollectionRule = {
    id: number;
    category?: number;
    min_price?: string;
    max_price?: string;
    dietary_tags?: any;
    popularity?: boolean;
    stock_status?: StockStatusEnum;
    created_at: string;
    updated_at: string;
  };

  type itemCollectionsDestroyParams = {
    id: string;
  };

  type itemCollectionsItemsCreateParams = {
    id: string;
  };

  type itemCollectionsItemsDestroyParams = {
    id: string;
    /** ID of the menu item to remove from the collection. */
    item_id: number;
  };

  type itemCollectionsItemsManualOrderCreateParams = {
    id: number;
  };

  type itemCollectionsItemsManualOrderUpdateParams = {
    id: number;
  };

  type itemCollectionsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type itemCollectionsPartialUpdateParams = {
    id: string;
  };

  type itemCollectionsPreviewRetrieveParams = {
    id: string;
  };

  type itemCollectionsRetrieveParams = {
    id: string;
  };

  type itemCollectionsUpdateParams = {
    id: string;
  };

  type ItemCollectionWrite = {
    id: number;
    name: string;
    description?: string;
    type: TypeEnum;
    is_active?: boolean;
    display_order?: number;
    available_from?: string;
    available_to?: string;
    item_ids?: number[];
    rules?: ItemCollectionRule[];
    created_at: string;
    updated_at: string;
  };

  type itemsBatchCreateCreateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type itemsBatchUpdatePartialUpdateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type itemsDestroyParams = {
    id: string;
  };

  type itemsListParams = {
    /** Filter by category ID */
    category?: number;
    /** Filter by active status */
    is_active?: boolean;
    /** Filter by availability */
    is_available?: boolean;
    /** Filter gluten-free items */
    is_gluten_free?: boolean;
    /** Filter vegan items */
    is_vegan?: boolean;
    /** Filter vegetarian items */
    is_vegetarian?: boolean;
    /** Filter by menu ID */
    menu?: number;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type itemsPartialUpdateParams = {
    id: string;
  };

  type itemsRetrieveParams = {
    id: string;
  };

  type itemsUpdateParams = {
    id: string;
  };

  type itemsUpdateStockPartialUpdateParams = {
    id: string;
  };

  type Job = {
    id: number;
    /** External reference from HRIS/POS integrations. */
    external_id?: string;
    tenant: number;
    name: string;
    code: string;
    description?: string;
    base_wage?: string;
    permissions?: any;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type laborBreakTypesDestroyParams = {
    /** A unique integer value identifying this break type. */
    id: number;
  };

  type laborBreakTypesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type laborBreakTypesPartialUpdateParams = {
    /** A unique integer value identifying this break type. */
    id: number;
  };

  type laborBreakTypesRetrieveParams = {
    /** A unique integer value identifying this break type. */
    id: number;
  };

  type laborBreakTypesUpdateParams = {
    /** A unique integer value identifying this break type. */
    id: number;
  };

  type laborEmployeesArchiveUpdateParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesDestroyParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesJobsUpdateParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type laborEmployeesPartialUpdateParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesPerformanceRetrieveParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesRetrieveParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesShiftsRetrieveParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesTimeEntriesRetrieveParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesUnarchiveUpdateParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesUpdateParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborEmployeesWageOverridesUpdateParams = {
    /** A unique integer value identifying this employee. */
    id: number;
  };

  type laborJobsDestroyParams = {
    /** A unique integer value identifying this job. */
    id: number;
  };

  type laborJobsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type laborJobsPartialUpdateParams = {
    /** A unique integer value identifying this job. */
    id: number;
  };

  type laborJobsRetrieveParams = {
    /** A unique integer value identifying this job. */
    id: number;
  };

  type laborJobsUpdateParams = {
    /** A unique integer value identifying this job. */
    id: number;
  };

  type laborShiftsCancelCreateParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborShiftsDestroyParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborShiftsEndCreateParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborShiftsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type laborShiftsPartialUpdateParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborShiftsRetrieveParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborShiftsStartCreateParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborShiftsUpdateParams = {
    /** A unique integer value identifying this shift. */
    id: number;
  };

  type laborTimeEntriesApproveCreateParams = {
    /** A unique integer value identifying this time entry. */
    id: number;
  };

  type laborTimeEntriesDestroyParams = {
    /** A unique integer value identifying this time entry. */
    id: number;
  };

  type laborTimeEntriesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type laborTimeEntriesPartialUpdateParams = {
    /** A unique integer value identifying this time entry. */
    id: number;
  };

  type laborTimeEntriesRetrieveParams = {
    /** A unique integer value identifying this time entry. */
    id: number;
  };

  type laborTimeEntriesUpdateParams = {
    /** A unique integer value identifying this time entry. */
    id: number;
  };

  type MembershipInfo = {
    id: number;
    tenant_id: number;
    tenant_uuid: string;
    tenant_name: string;
    /** Membership Role */
    role: MembershipRoleEnum;
    created_at: string;
    updated_at: string;
  };

  type MembershipRoleEnum = "owner" | "admin" | "member";

  type Menu = {
    id: number;
    tenant: number;
    name: string;
    description?: string;
    /** Whether this menu is currently available for ordering */
    is_available?: boolean;
    is_currently_available: boolean;
    /** Daily start time (e.g., 11:00 for lunch) */
    available_from_time?: string;
    /** Daily end time (e.g., 15:00 for lunch) */
    available_to_time?: string;
    /** List of weekday numbers when this menu is available (0=Mon, 6=Sun). Empty list = all days */
    available_weekdays?: any;
    /** Order in which menus are displayed (lower values first) */
    display_order?: number;
    is_active?: boolean;
    item_count: number;
    available_item_count: number;
    created_at: string;
    updated_at: string;
  };

  type MenuCategory = {
    id: number;
    tenant: number;
    name: string;
    description?: string;
    /** Order in which categories are displayed (lower values first) */
    display_order?: number;
    is_active?: boolean;
    item_count: number;
    created_at: string;
    updated_at: string;
  };

  type MenuDetail = {
    id: number;
    tenant: number;
    name: string;
    description?: string;
    /** Whether this menu is currently available for ordering */
    is_available?: boolean;
    is_currently_available: boolean;
    /** Daily start time (e.g., 11:00 for lunch) */
    available_from_time?: string;
    /** Daily end time (e.g., 15:00 for lunch) */
    available_to_time?: string;
    /** List of weekday numbers when this menu is available (0=Mon, 6=Sun). Empty list = all days */
    available_weekdays?: any;
    /** Order in which menus are displayed (lower values first) */
    display_order?: number;
    is_active?: boolean;
    item_count: number;
    available_item_count: number;
    created_at: string;
    updated_at: string;
    items: MenuItemNested[];
    categories: MenuCategory[];
  };

  type MenuItem = {
    id: number;
    menu: number;
    menu_name: string;
    category?: number;
    category_name: string;
    name: string;
    description?: string;
    price: string;
    /** Whether this item is currently available for ordering */
    is_available?: boolean;
    is_in_stock: boolean;
    /** Current stock quantity. Null = unlimited. 0 = out of stock */
    stock_quantity?: number;
    is_vegetarian?: boolean;
    is_vegan?: boolean;
    is_gluten_free?: boolean;
    /** List of allergens (e.g., ['nuts', 'dairy', 'shellfish']) */
    allergens?: any;
    /** Estimated preparation time in minutes */
    preparation_time_minutes?: number;
    /** Calorie count (optional) */
    calories?: number;
    /** URL to item image */
    image_url?: string;
    /** Order in which items are displayed (lower values first) */
    display_order?: number;
    /** Mark as popular/recommended item */
    is_popular?: boolean;
    is_spicy?: boolean;
    /** Spice level (1-5, where 5 is hottest). Null if not spicy */
    spice_level?: number;
    is_active?: boolean;
    product_options: ProductOption[];
    product_variants: ProductVariant[];
    created_at: string;
    updated_at: string;
  };

  type MenuItemNested = {
    id: number;
    category?: number;
    category_name: string;
    name: string;
    description?: string;
    price: string;
    /** Whether this item is currently available for ordering */
    is_available?: boolean;
    is_in_stock: boolean;
    /** Current stock quantity. Null = unlimited. 0 = out of stock */
    stock_quantity?: number;
    is_vegetarian?: boolean;
    is_vegan?: boolean;
    is_gluten_free?: boolean;
    /** List of allergens (e.g., ['nuts', 'dairy', 'shellfish']) */
    allergens?: any;
    /** Estimated preparation time in minutes */
    preparation_time_minutes?: number;
    /** Calorie count (optional) */
    calories?: number;
    /** URL to item image */
    image_url?: string;
    /** Order in which items are displayed (lower values first) */
    display_order?: number;
    /** Mark as popular/recommended item */
    is_popular?: boolean;
    is_spicy?: boolean;
    /** Spice level (1-5, where 5 is hottest). Null if not spicy */
    spice_level?: number;
  };

  type menusCloneCreateParams = {
    id: string;
  };

  type menusDestroyParams = {
    id: string;
  };

  type menusListParams = {
    /** Filter by active status */
    is_active?: boolean;
    /** Filter by availability status */
    is_available?: boolean;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type menusPartialUpdateParams = {
    id: string;
  };

  type menusRetrieveParams = {
    id: string;
  };

  type menusUpdateParams = {
    id: string;
  };

  type myCouponsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type myReservationsCancelCreateParams = {
    id: string;
  };

  type myReservationsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type myReservationsRetrieveParams = {
    id: string;
  };

  type OpenDrawer = {
    /** Starting balance for the session */
    opening_balance: string;
    /** ID of the Employee member opening the drawer */
    employee_id: number;
  };

  type Order = {
    id: number;
    tenant: number;
    table: number;
    order_number: string;
    status?: OrderStatusEnum;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    subtotal?: string;
    tax?: string;
    discount_total: string;
    /** Discount value attributed to add-buy pricing adjustments */
    add_buy_discount_total: string;
    total?: string;
    applied_coupon?: number;
    coupon_code: string;
    ordered_at: string;
    served_at: string;
    paid_at: string;
    voided_at: string;
    note?: string;
    staff?: number;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
    items?: OrderItem[];
    bills: Record<string, any>[];
    is_billed: boolean;
    created_at: string;
    updated_at: string;
  };

  type OrderApplyDiscount = {
    discount_amount?: string;
    discount_percentage?: string;
    reason?: string;
    metadata?: Record<string, any>;
  };

  type OrderBillSplitAllocationStatusEnum = "OPEN" | "SETTLED" | "CANCELLED";

  type OrderBillSplitStatusEnum = "ACTIVE" | "FINALIZED" | "CANCELLED";

  type OrderBillSplitTypeEnum = "EQUAL" | "BY_ITEMS" | "BY_RATIO" | "CUSTOM";

  type OrderCreatePayment = {
    /** Payment method: CASH, LINE_PAY, or CREDIT_CARD

* `CASH` - Cash
* `LINE_PAY` - Line Pay
* `CREDIT_CARD` - Credit Card */
    payment_method: PaymentMethodEnum;
    /** Payment amount */
    amount: string;
    /** Payment status (defaults to PENDING)

* `PENDING` - Pending
* `PROCESSING` - Processing
* `COMPLETED` - Completed
* `FAILED` - Failed
* `REFUNDED` - Refunded
* `PARTIALLY_REFUNDED` - Partially Refunded */
    status?: PaymentStatusEnum;
    /** Amount received from customer (for CASH) */
    cash_received?: string;
    /** Change to return (auto-calculated for CASH) */
    cash_change?: string;
    /** Line Pay transaction ID (required for completed LINE_PAY) */
    line_pay_transaction_id?: string;
    /** Last 4 digits of card (for CREDIT_CARD) */
    card_last_four?: string;
    /** Card brand like Visa, Mastercard (for CREDIT_CARD) */
    card_brand?: string;
    /** External payment gateway transaction ID */
    external_transaction_id?: string;
    /** Optional payment note */
    note?: string;
    /** Employee who processed the payment */
    staff_name?: string;
  };

  type OrderItem = {
    id: number;
    name?: string;
    /** Linked menu item when the order originated from the menu system */
    menu_item?: number;
    product_variant?: number;
    variant_summary: string;
    quantity: number;
    unit_price?: string;
    subtotal?: string;
    category?: string;
    note?: string;
    is_add_buy?: boolean;
    add_buy_collection?: number;
    add_buy_item?: number;
    list_price: string;
    created_at: string;
    updated_at: string;
  };

  type OrderItemInput = {
    name: string;
    quantity: number;
    unit_price: string;
    subtotal?: string;
    category?: string;
    note?: string;
  };

  type OrderItemSnapshot = {
    menu_item?: number;
    product_variant?: number;
    quantity: number;
    unit_price?: string;
    subtotal?: string;
    is_add_buy?: boolean;
    add_buy_item?: number;
  };

  type OrderPaymentSummary = {
    order_id: number;
    order_number: string;
    order_total: string;
    total_paid: string;
    total_refunded: string;
    net_paid: string;
    outstanding_balance: string;
    is_fully_paid: boolean;
    payment_count: number;
    completed_payments: number;
    pending_payments: number;
    failed_payments: number;
    refunded_payments: number;
    payments: any[];
  };

  type ordersApplyDiscountCreateParams = {
    id: string;
  };

  type ordersBillsListParams = {
    id: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type ordersCreatePaymentCreateParams = {
    id: string;
  };

  type ordersDestroyParams = {
    id: string;
  };

  type ordersListParams = {
    /** Filter by order date (YYYY-MM-DD) */
    date?: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by status (PENDING, SERVED, PAID, CANCELLED, VOID) */
    status?: string;
    /** Filter by table ID */
    table?: number;
  };

  type ordersPartialUpdateParams = {
    id: string;
  };

  type ordersPayCreateParams = {
    id: string;
  };

  type ordersPaymentsListParams = {
    id: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type ordersPaymentSummaryRetrieveParams = {
    id: string;
  };

  type ordersRetrieveParams = {
    id: string;
  };

  type ordersServeCreateParams = {
    id: string;
  };

  type ordersSplitCreateParams = {
    id: string;
  };

  type ordersSplitsListParams = {
    id: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type ordersStatsRetrieveParams = {
    /** Filter by date (YYYY-MM-DD), defaults to today */
    date?: string;
  };

  type ordersStatusPartialUpdateParams = {
    id: string;
  };

  type OrderStatusEnum = "PENDING" | "SERVED" | "PAID" | "CANCELLED" | "VOID";

  type ordersUpdateParams = {
    id: string;
  };

  type ordersVoidCreateParams = {
    id: string;
  };

  type PaginatedApprovalRequestList = {
    count: number;
    next?: string;
    previous?: string;
    results: ApprovalRequest[];
  };

  type PaginatedApprovalRuleList = {
    count: number;
    next?: string;
    previous?: string;
    results: ApprovalRule[];
  };

  type PaginatedBillListList = {
    count: number;
    next?: string;
    previous?: string;
    results: BillList[];
  };

  type PaginatedBillSplitList = {
    count: number;
    next?: string;
    previous?: string;
    results: BillSplit[];
  };

  type PaginatedBreakTypeList = {
    count: number;
    next?: string;
    previous?: string;
    results: BreakType[];
  };

  type PaginatedCashDrawerSessionListList = {
    count: number;
    next?: string;
    previous?: string;
    results: CashDrawerSessionList[];
  };

  type PaginatedCashEntryListList = {
    count: number;
    next?: string;
    previous?: string;
    results: CashEntryList[];
  };

  type PaginatedCustomerCouponList = {
    count: number;
    next?: string;
    previous?: string;
    results: CustomerCoupon[];
  };

  type PaginatedCustomerList = {
    count: number;
    next?: string;
    previous?: string;
    results: Customer[];
  };

  type PaginatedEmployeeList = {
    count: number;
    next?: string;
    previous?: string;
    results: Employee[];
  };

  type PaginatedInvoiceAllowanceList = {
    count: number;
    next?: string;
    previous?: string;
    results: InvoiceAllowance[];
  };

  type PaginatedInvoiceList = {
    count: number;
    next?: string;
    previous?: string;
    results: Invoice[];
  };

  type PaginatedInvoiceTrackList = {
    count: number;
    next?: string;
    previous?: string;
    results: InvoiceTrack[];
  };

  type PaginatedItemCollectionListList = {
    count: number;
    next?: string;
    previous?: string;
    results: ItemCollectionList[];
  };

  type PaginatedJobList = {
    count: number;
    next?: string;
    previous?: string;
    results: Job[];
  };

  type PaginatedMenuCategoryList = {
    count: number;
    next?: string;
    previous?: string;
    results: MenuCategory[];
  };

  type PaginatedMenuItemList = {
    count: number;
    next?: string;
    previous?: string;
    results: MenuItem[];
  };

  type PaginatedMenuList = {
    count: number;
    next?: string;
    previous?: string;
    results: Menu[];
  };

  type PaginatedOrderList = {
    count: number;
    next?: string;
    previous?: string;
    results: Order[];
  };

  type PaginatedPaymentList = {
    count: number;
    next?: string;
    previous?: string;
    results: Payment[];
  };

  type PaginatedProductOptionList = {
    count: number;
    next?: string;
    previous?: string;
    results: ProductOption[];
  };

  type PaginatedProductVariantList = {
    count: number;
    next?: string;
    previous?: string;
    results: ProductVariant[];
  };

  type PaginatedReservationList = {
    count: number;
    next?: string;
    previous?: string;
    results: Reservation[];
  };

  type PaginatedShiftList = {
    count: number;
    next?: string;
    previous?: string;
    results: Shift[];
  };

  type PaginatedTableList = {
    count: number;
    next?: string;
    previous?: string;
    results: Table[];
  };

  type PaginatedTableTagList = {
    count: number;
    next?: string;
    previous?: string;
    results: TableTag[];
  };

  type PaginatedTableZoneList = {
    count: number;
    next?: string;
    previous?: string;
    results: TableZone[];
  };

  type PaginatedTimeEntryList = {
    count: number;
    next?: string;
    previous?: string;
    results: TimeEntry[];
  };

  type PatchedAddBuyCollection = {
    id?: number;
    tenant?: number;
    /** Optional identifier for integrations or experimentation dashboards */
    code?: string;
    name_translations?: Record<string, any>;
    description_translations?: Record<string, any>;
    /** Primary trigger category for this add-buy collection

* `ALWAYS` - Always
* `MENU_ITEM` - Specific menu items
* `ORDER_AMOUNT` - Order amount threshold
* `CATEGORY` - Menu category inclusion */
    trigger_type?: TriggerTypeEnum;
    /** Structured payload describing trigger specifics (e.g. quantity thresholds, match rules) */
    trigger_configuration?: any;
    /** Minimum order subtotal required when trigger_type=ORDER_AMOUNT */
    trigger_minimum_amount?: string;
    trigger_menu_items?: number[];
    /** Optional cap on how many add-buy items from this collection can be attached to a single order */
    max_quantity_per_order?: number;
    /** Manual ordering for display. Lower values appear first. */
    sort_order?: number;
    is_enabled?: boolean;
    /** Optional start datetime after which the collection becomes eligible */
    starts_at?: string;
    /** Optional end datetime after which the collection is no longer offered */
    ends_at?: string;
    /** Experiment group identifier (e.g., 'winter-upsell-experiment') */
    ab_test_group?: string;
    /** Variant bucket identifier (e.g., 'control', 'variant-a') */
    ab_test_variant?: string;
    /** Extensible metadata for BI systems */
    metadata?: any;
    items?: AddBuyItemNested[];
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedAddBuyItem = {
    id?: number;
    collection?: number;
    menu_item?: number;
    product_variant?: number;
    /** Determines how the add-buy price will be calculated

* `ORIGINAL` - Original price
* `DISCOUNT_RATE` - Discount rate
* `FIXED_PRICE` - Fixed add-on price */
    price_type?: PriceTypeEnum;
    /** Discount rate applied to the base price (0.15 = 15% off) when price_type=DISCOUNT_RATE */
    discount_rate?: string;
    /** Final price to charge when price_type=FIXED_PRICE */
    fixed_price?: string;
    /** Optional per-order limit for this specific item */
    max_quantity_per_order?: number;
    /** Global cap on how many times this item can be sold as an add-buy */
    inventory_limit?: number;
    /** Number of add-buy units already consumed by orders */
    inventory_consumed?: number;
    sort_order?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedApprovalRule = {
    id?: number;
    tenant?: number;
    rule_type?: ApprovalRequestTypeEnum;
    condition?: any;
    required_role?: ApprovalRoleEnum;
    is_active?: boolean;
    priority?: number;
    description?: string;
    metadata?: any;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedBatchMenuItemUpdate = {
    items?: Record<string, any>[];
  };

  type PatchedBill = {
    id?: number;
    tenant?: number;
    order?: number;
    order_number?: string;
    table_number?: string;
    customer_name?: string;
    bill_number?: string;
    status?: BillStatusEnum;
    /** Tax rate as percentage (e.g., 5.00 for 5%) */
    tax_rate?: string;
    /** Service charge rate as percentage (e.g., 10.00 for 10%) */
    service_charge_rate?: string;
    /** Fixed discount amount applied to the bill */
    discount_amount?: string;
    /** Order subtotal before any charges or discounts */
    subtotal?: string;
    /** Calculated tax amount based on tax_rate */
    tax_amount?: string;
    /** Calculated service charge based on service_charge_rate */
    service_charge_amount?: string;
    /** Final amount: subtotal + tax + service_charge - discount */
    grand_total?: string;
    issued_at?: string;
    voided_at?: string;
    note?: string;
    staff?: number;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
    net_amount?: string;
    is_voided?: boolean;
    invoice_id?: number;
    invoice_number?: string;
    invoice_status?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedBillSplitRatioUpdate = {
    ratios?: string[];
    labels?: string[];
  };

  type PatchedBreakType = {
    id?: number;
    tenant?: number;
    name?: string;
    /** Duration in minutes. */
    duration?: number;
    is_paid?: boolean;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedCashDrawer = {
    id?: number;
    tenant?: number;
    /** Name of the cash drawer (e.g., 'Counter Register 1') */
    name?: string;
    /** Physical location description */
    location?: string;
    /** Associated device identifier (optional) */
    device?: string;
    status?: CashDrawerStatusEnum;
    /** Whether this drawer is currently in use */
    is_active?: boolean;
    /** Starting balance for the current session */
    opening_balance?: string;
    /** Current calculated balance */
    current_balance?: string;
    /** Expected balance based on transactions */
    expected_balance?: string;
    /** When the current session started */
    opened_at?: string;
    opened_by?: number;
    opened_by_name?: string;
    /** When the current session ended */
    closed_at?: string;
    closed_by?: number;
    closed_by_name?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedCashEntry = {
    id?: number;
    tenant?: number;
    cash_drawer?: number;
    cash_drawer_name?: string;
    session?: number;
    entry_type?: CashEntryTypeEnum;
    /** Amount (positive for cash in, negative for cash out) */
    amount?: string;
    employee?: number;
    employee_name?: string;
    /** Business date for reporting purposes */
    business_date?: string;
    /** Reason for this cash entry */
    reason?: string;
    note?: string;
    reference_type?: number;
    reference_id?: number;
    /** Device that created this entry */
    created_device?: string;
    /** Whether this entry has been voided */
    is_void?: boolean;
    voided_at?: string;
    voided_by?: number;
    voided_by_name?: string;
    void_reason?: string;
    is_cash_in?: boolean;
    is_cash_out?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedCoupon = {
    id?: number;
    tenant?: number;
    code?: string;
    name?: string;
    description?: string;
    discount_type?: DiscountTypeEnum;
    discount_value?: string;
    min_purchase_amount?: string;
    /** Total number of times this coupon can be used across all customers. */
    usage_limit?: number;
    /** Number of successful redemptions for this coupon. */
    usage_count?: number;
    /** Maximum number of times a single customer may redeem this coupon. */
    per_customer_limit?: number;
    valid_from?: string;
    valid_to?: string;
    is_active?: boolean;
    applicable_items?: number[];
    applicable_categories?: number[];
    metadata?: any;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedEmployee = {
    id?: number;
    /** Reference for payroll/HR integrations. */
    external_id?: string;
    tenant?: number;
    user?: number;
    user_name?: string;
    user_email?: string;
    employee_number?: string;
    hire_date?: string;
    termination_date?: string;
    is_archived?: boolean;
    archived_at?: string;
    jobs?: Job[];
    job_ids?: number[];
    created_at?: string;
    updated_at?: string;
  };

  type PatchedExpenseWrite = {
    id?: number;
    expense_date?: string;
    category?: CategoryEnum;
    description?: string;
    amount?: string;
    payment_method?: ExpensePaymentMethodEnum;
    note?: string;
    recorded_by?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedInvoice = {
    id?: number;
    tenant?: number;
    track?: number;
    track_id?: number;
    track_prefix?: string;
    track_year_month?: string;
    bill?: number;
    bill_id?: number;
    bill_number?: string;
    payment?: number;
    payment_id?: number;
    payment_number?: string;
    invoice_number?: string;
    issue_date?: string;
    status?: EinvoiceStatusEnum;
    tax_type?: InvoiceTaxTypeEnum;
    currency?: string;
    sales_amount?: string;
    tax_amount?: string;
    total_amount?: string;
    /** Uniform number for B2B invoices. */
    buyer_identifier?: string;
    buyer_name?: string;
    buyer_email?: string;
    /** Carrier type (e.g. /U, /C, CT, by tax authority specification). */
    carrier_type?: string;
    /** Carrier identifier (phone barcode, natural person certificate, etc.). */
    carrier_number?: string;
    /** Donation code for charity donations. */
    donation_code?: string;
    print_mark?: InvoicePrintMarkEnum;
    remark?: string;
    void_reason?: string;
    voided_at?: string;
    metadata?: any;
    remaining_allowance_amount?: string;
    allowances?: InvoiceAllowance[];
    created_at?: string;
    updated_at?: string;
  };

  type PatchedInvoiceAllowance = {
    id?: number;
    tenant?: number;
    invoice?: number;
    invoice_number?: string;
    allowance_number?: string;
    issue_date?: string;
    status?: EinvoiceStatusEnum;
    sales_amount?: string;
    tax_amount?: string;
    total_amount?: string;
    reason?: string;
    remark?: string;
    refund_payment?: number;
    refund_payment_number?: string;
    void_reason?: string;
    voided_at?: string;
    metadata?: any;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedInvoiceTrack = {
    id?: number;
    tenant?: number;
    /** Two-letter prefix assigned by the tax authority (e.g. AB). */
    prefix?: string;
    /** Bi-monthly period represented in YYYYMM (e.g. 202501 for Jan-Feb). */
    year_month?: string;
    /** First numeric number of the track (1-8 digits). */
    start_number?: number;
    /** Last numeric number of the track (inclusive). */
    end_number?: number;
    /** Last numeric value used from this track. Null indicates none issued yet. */
    last_issued_number?: number;
    status?: InvoiceTrackStatusEnum;
    /** Optional activation date; invoices cannot be issued before this date. */
    activation_date?: string;
    /** Optional expiration date; invoices cannot be issued after this date. */
    expiration_date?: string;
    /** Marks the default track to use when issuing invoices automatically. */
    is_default?: boolean;
    notes?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedItemCollectionWrite = {
    id?: number;
    name?: string;
    description?: string;
    type?: TypeEnum;
    is_active?: boolean;
    display_order?: number;
    available_from?: string;
    available_to?: string;
    item_ids?: number[];
    rules?: ItemCollectionRule[];
    created_at?: string;
    updated_at?: string;
  };

  type PatchedJob = {
    id?: number;
    /** External reference from HRIS/POS integrations. */
    external_id?: string;
    tenant?: number;
    name?: string;
    code?: string;
    description?: string;
    base_wage?: string;
    permissions?: any;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedMenu = {
    id?: number;
    tenant?: number;
    name?: string;
    description?: string;
    /** Whether this menu is currently available for ordering */
    is_available?: boolean;
    is_currently_available?: boolean;
    /** Daily start time (e.g., 11:00 for lunch) */
    available_from_time?: string;
    /** Daily end time (e.g., 15:00 for lunch) */
    available_to_time?: string;
    /** List of weekday numbers when this menu is available (0=Mon, 6=Sun). Empty list = all days */
    available_weekdays?: any;
    /** Order in which menus are displayed (lower values first) */
    display_order?: number;
    is_active?: boolean;
    item_count?: number;
    available_item_count?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedMenuCategory = {
    id?: number;
    tenant?: number;
    name?: string;
    description?: string;
    /** Order in which categories are displayed (lower values first) */
    display_order?: number;
    is_active?: boolean;
    item_count?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedMenuItem = {
    id?: number;
    menu?: number;
    menu_name?: string;
    category?: number;
    category_name?: string;
    name?: string;
    description?: string;
    price?: string;
    /** Whether this item is currently available for ordering */
    is_available?: boolean;
    is_in_stock?: boolean;
    /** Current stock quantity. Null = unlimited. 0 = out of stock */
    stock_quantity?: number;
    is_vegetarian?: boolean;
    is_vegan?: boolean;
    is_gluten_free?: boolean;
    /** List of allergens (e.g., ['nuts', 'dairy', 'shellfish']) */
    allergens?: any;
    /** Estimated preparation time in minutes */
    preparation_time_minutes?: number;
    /** Calorie count (optional) */
    calories?: number;
    /** URL to item image */
    image_url?: string;
    /** Order in which items are displayed (lower values first) */
    display_order?: number;
    /** Mark as popular/recommended item */
    is_popular?: boolean;
    is_spicy?: boolean;
    /** Spice level (1-5, where 5 is hottest). Null if not spicy */
    spice_level?: number;
    is_active?: boolean;
    product_options?: ProductOption[];
    product_variants?: ProductVariant[];
    created_at?: string;
    updated_at?: string;
  };

  type PatchedOrder = {
    id?: number;
    tenant?: number;
    table?: number;
    order_number?: string;
    status?: OrderStatusEnum;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    subtotal?: string;
    tax?: string;
    discount_total?: string;
    /** Discount value attributed to add-buy pricing adjustments */
    add_buy_discount_total?: string;
    total?: string;
    applied_coupon?: number;
    coupon_code?: string;
    ordered_at?: string;
    served_at?: string;
    paid_at?: string;
    voided_at?: string;
    note?: string;
    staff?: number;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
    items?: OrderItem[];
    bills?: Record<string, any>[];
    is_billed?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedOrderStatusUpdate = {
    /** New status for the order

* `PENDING` - Pending
* `SERVED` - Served
* `PAID` - Paid
* `CANCELLED` - Cancelled
* `VOID` - Void */
    status?: OrderStatusEnum;
    /** Optional note for status change */
    note?: string;
  };

  type PatchedPayment = {
    id?: number;
    tenant?: number;
    order?: number;
    payment_number?: string;
    payment_method?: PaymentMethodEnum;
    status?: PaymentStatusEnum;
    amount?: string;
    refunded_amount?: string;
    net_amount?: string;
    is_fully_refunded?: boolean;
    can_be_refunded?: boolean;
    card_last_four?: string;
    card_brand?: string;
    line_pay_transaction_id?: string;
    cash_received?: string;
    cash_change?: string;
    external_transaction_id?: string;
    paid_at?: string;
    refunded_at?: string;
    note?: string;
    staff?: number;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
    failure_reason?: string;
    invoice_id?: number;
    invoice_number?: string;
    invoice_status?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedProductOption = {
    id?: number;
    menu_item?: number;
    menu_item_name?: string;
    name?: string;
    values?: string[];
    /** Controls ordering of options within a menu item */
    display_order?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedProductVariant = {
    id?: number;
    menu_item?: number;
    menu_item_name?: string;
    sku?: string;
    /** Price delta relative to the base menu item (can be negative) */
    price_difference?: string;
    /** Current variant stock. Null inherits item availability; 0 = out of stock */
    stock_quantity?: number;
    is_active?: boolean;
    option_values?: Record<string, any>[];
    option_summary?: string;
    final_price?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedQueue = {
    id?: number;
    tenant?: number;
    ticket_number?: string;
    customer_name?: string;
    customer_phone?: string;
    party_size?: number;
    adults?: number;
    children?: number;
    status?: QueueStatusEnum;
    table?: number;
    issued_at?: string;
    called_at?: string;
    seated_at?: string;
    note?: string;
    estimated_wait_minutes?: number;
    wait_time_minutes?: number;
    position_in_queue?: number;
    reservation_id?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedReservation = {
    id?: number;
    tenant?: number;
    table?: number;
    status?: ReservationStatusEnum;
    start?: string;
    end?: string;
    party_size?: number;
    adults?: number;
    children?: number;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    note?: string;
    duration_minutes?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedShift = {
    id?: number;
    external_id?: string;
    tenant?: number;
    employee?: number;
    employee_display?: string;
    job?: number;
    job_name?: string;
    start_time?: string;
    end_time?: string;
    /** Minutes. */
    break_duration?: number;
    status?: ShiftStatusEnum;
    notes?: string;
    duration_minutes?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTable = {
    id?: number;
    tenant?: number;
    name?: string;
    capacity?: number;
    min_party_size?: number;
    zone?: number;
    zone_name?: string;
    tags?: number[];
    tag_names?: string[];
    features?: number[];
    feature_labels?: string[];
    /** Manual table state managed by the state machine

* `AVAILABLE` - Available
* `HELD` - Held
* `OCCUPIED` - Occupied
* `DIRTY` - Needs Cleaning
* `MAINTENANCE` - Maintenance */
    state?: TargetStateEnum;
    current_state?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTableClosure = {
    id?: number;
    tenant?: number;
    table?: number;
    table_name?: string;
    group?: number;
    group_name?: string;
    zone?: number;
    zone_name?: string;
    start?: string;
    end?: string;
    note?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTableFeature = {
    id?: number;
    tenant?: number;
    key?: string;
    label?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTableGroup = {
    id?: number;
    tenant?: number;
    name?: string;
    tables?: number[];
    table_names?: string[];
    capacity?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTableHold = {
    id?: number;
    tenant?: number;
    table?: number;
    table_name?: string;
    group?: number;
    group_name?: string;
    start?: string;
    end?: string;
    reason?: string;
    held_by?: string;
    expires_at?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTableTag = {
    id?: number;
    tenant?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTableZone = {
    id?: number;
    tenant?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
    is_active?: boolean;
  };

  type PatchedTenant = {
    id?: number;
    uuid?: string;
    name?: string;
    location?: string;
    description?: string;
    business_hours?: string;
    parking_information?: string;
    phone_number?: string;
    image_url?: string;
    reservation_slot_interval_minutes?: number;
    reservation_start_time?: string;
    reservation_end_time?: string;
    default_dining_duration_minutes?: number;
    max_party_size?: number;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTenantClosureSettings = {
    regular_closed_weekdays?: number[];
    special_closures?: ClosurePeriod[];
  };

  type PatchedTenantGeneralSettings = {
    /** Language code following Django's LANGUAGES setting (e.g., en-us). */
    language?: string;
    /** IANA timezone string (e.g., UTC, Asia/Taipei). */
    timezone?: string;
  };

  type PatchedTenantInvitationCancel = {
    status?: InvitationStatusEnum;
  };

  type PatchedTenantMembershipManage = {
    id?: number;
    tenant?: number;
    user_id?: number;
    user_email?: string;
    user_name?: string;
    is_active?: boolean;
    deactivated_at?: string;
    role?: TenantInvitationRoleEnum;
    created_at?: string;
    updated_at?: string;
  };

  type PatchedTenantReservationSettings = {
    reservation_slot_interval_minutes?: number;
    default_dining_duration_minutes?: number;
    max_party_size?: number;
  };

  type PatchedTimeEntry = {
    id?: number;
    external_id?: string;
    tenant?: number;
    shift?: number;
    employee?: number;
    employee_display?: string;
    job?: number;
    job_name?: string;
    clock_in?: string;
    clock_out?: string;
    /** Minutes. */
    break_time?: number;
    note?: string;
    clock_in_source?: string;
    clock_out_source?: string;
    regular_hours?: string;
    overtime_hours?: string;
    hourly_wage?: string;
    total_wage?: string;
    approved_by?: number;
    approved_at?: string;
    created_at?: string;
    updated_at?: string;
  };

  type Payment = {
    id: number;
    tenant: number;
    order: number;
    payment_number: string;
    payment_method: PaymentMethodEnum;
    status?: PaymentStatusEnum;
    amount: string;
    refunded_amount?: string;
    net_amount: string;
    is_fully_refunded: boolean;
    can_be_refunded: boolean;
    card_last_four?: string;
    card_brand?: string;
    line_pay_transaction_id?: string;
    cash_received?: string;
    cash_change?: string;
    external_transaction_id?: string;
    paid_at: string;
    refunded_at: string;
    note?: string;
    staff?: number;
    /** Employee name (auto-filled from employee FK, or manually set for guest/unnamed staff) */
    staff_name?: string;
    failure_reason?: string;
    invoice_id: number;
    invoice_number: string;
    invoice_status: string;
    created_at: string;
    updated_at: string;
  };

  type PaymentComplete = {
    /** Line Pay transaction ID (required for Line Pay) */
    line_pay_transaction_id?: string;
    /** Last 4 digits of card (for Credit Card) */
    card_last_four?: string;
    /** Card brand (for Credit Card) */
    card_brand?: string;
    /** External payment gateway transaction ID */
    external_transaction_id?: string;
    /** Optional note */
    note?: string;
  };

  type PaymentFail = {
    /** Reason for payment failure */
    failure_reason: string;
    /** Optional additional note */
    note?: string;
  };

  type PaymentMethodEnum = "CASH" | "LINE_PAY" | "CREDIT_CARD";

  type PaymentRefund = {
    /** Amount to refund */
    refund_amount: string;
    /** Optional note for refund */
    note?: string;
  };

  type paymentsCompleteCreateParams = {
    id: string;
  };

  type paymentsDestroyParams = {
    id: string;
  };

  type paymentsFailCreateParams = {
    id: string;
  };

  type paymentsListParams = {
    /** Filter by payment date (YYYY-MM-DD) */
    date?: string;
    /** Filter by end date (YYYY-MM-DD) */
    end_date?: string;
    /** Filter by order ID */
    order?: number;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by payment method (CASH, LINE_PAY, CREDIT_CARD) */
    payment_method?: string;
    /** Filter by start date (YYYY-MM-DD) */
    start_date?: string;
    /** Filter by status (PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED, PARTIALLY_REFUNDED) */
    status?: string;
  };

  type paymentsPartialUpdateParams = {
    id: string;
  };

  type paymentsRefundCreateParams = {
    id: string;
  };

  type paymentsRetrieveParams = {
    id: string;
  };

  type paymentsStatsRetrieveParams = {
    /** Filter by date (YYYY-MM-DD). Defaults to today. */
    date?: string;
    /** Filter by end date (YYYY-MM-DD) */
    end_date?: string;
    /** Filter by start date (YYYY-MM-DD) */
    start_date?: string;
  };

  type PaymentStatusEnum =
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED";

  type paymentsUpdateParams = {
    id: string;
  };

  type PriceTypeEnum = "ORIGINAL" | "DISCOUNT_RATE" | "FIXED_PRICE";

  type ProductOption = {
    id: number;
    menu_item: number;
    menu_item_name: string;
    name: string;
    values: string[];
    /** Controls ordering of options within a menu item */
    display_order?: number;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type productOptionsDestroyParams = {
    id: string;
  };

  type productOptionsListParams = {
    /** Filter by active status */
    is_active?: boolean;
    /** Filter options by menu item ID */
    menu_item?: number;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type productOptionsPartialUpdateParams = {
    id: string;
  };

  type productOptionsRetrieveParams = {
    id: string;
  };

  type productOptionsUpdateParams = {
    id: string;
  };

  type ProductVariant = {
    id: number;
    menu_item: number;
    menu_item_name: string;
    sku: string;
    /** Price delta relative to the base menu item (can be negative) */
    price_difference?: string;
    /** Current variant stock. Null inherits item availability; 0 = out of stock */
    stock_quantity?: number;
    is_active?: boolean;
    option_values?: Record<string, any>[];
    option_summary: string;
    final_price: string;
    created_at: string;
    updated_at: string;
  };

  type ProductVariantBatchStockUpdate = {
    /** Each entry must specify either 'id' or 'sku' plus 'stock_quantity'. */
    updates: Record<string, any>[];
  };

  type productVariantsBatchUpdateStockCreateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type productVariantsBySkuRetrieveParams = {
    /** Variant SKU to retrieve */
    sku: string;
  };

  type productVariantsDestroyParams = {
    id: string;
  };

  type productVariantsListParams = {
    /** Filter by active status */
    is_active?: boolean;
    /** Filter variants by menu item ID */
    menu_item?: number;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type productVariantsPartialUpdateParams = {
    id: string;
  };

  type productVariantsRetrieveParams = {
    id: string;
  };

  type productVariantsUpdateParams = {
    id: string;
  };

  type ProfitReport = {
    start_date: string;
    end_date: string;
    gross_revenue: string;
    refunds: string;
    net_revenue: string;
    expenses: string;
    net_profit: string;
    profit_margin: number;
  };

  type publicReservationsAvailabilityRetrieveParams = {
    /** Number of adults in the party */
    adults: number;
    /** Number of children in the party (default 0) */
    children?: number;
    /** Reservation date (YYYY-MM-DD) */
    date: string;
    /** Override the default dining duration for this lookup */
    duration_minutes?: number;
    /** Optional comma separated list of table IDs to limit the lookup */
    table_ids?: string;
    /** Tenant UUID to evaluate availability for */
    tenant_uuid: string;
  };

  type PublicTable = {
    id: number;
    name: string;
    capacity: number;
    min_party_size: number;
    zone: PublicTableZone;
    tags: PublicTableTag[];
    features: PublicTableFeature[];
  };

  type PublicTableFeature = {
    id: number;
    key: string;
    label: string;
  };

  type PublicTableTag = {
    id: number;
    name: string;
  };

  type PublicTableZone = {
    id: number;
    name: string;
  };

  type PublicTenantDetail = {
    id: number;
    uuid: string;
    name: string;
    location: string;
    description: string;
    business_hours: string;
    parking_information: string;
    phone_number: string;
    image_url: string;
    reservation_slot_interval_minutes: number;
    reservation_start_time: string;
    reservation_end_time: string;
    default_dining_duration_minutes: number;
    table_count: number;
    zone_count: number;
    tag_count: number;
    feature_count: number;
    max_reservable_party_size: number;
    zones: PublicTableZone[];
    tags: PublicTableTag[];
    features: PublicTableFeature[];
    tables: PublicTable[];
    created_at: string;
    updated_at: string;
  };

  type PublicTenantList = {
    id: number;
    uuid: string;
    name: string;
    table_count: number;
    zone_count: number;
    tag_count: number;
    feature_count: number;
    created_at: string;
    updated_at: string;
  };

  type publicTenantsRetrieveParams = {
    uuid: string;
  };

  type Queue = {
    id: number;
    tenant: number;
    ticket_number: string;
    customer_name: string;
    customer_phone?: string;
    party_size?: number;
    adults?: number;
    children?: number;
    status?: QueueStatusEnum;
    table?: number;
    issued_at: string;
    called_at: string;
    seated_at: string;
    note?: string;
    estimated_wait_minutes?: number;
    wait_time_minutes: number;
    position_in_queue: number;
    reservation_id: number;
    created_at: string;
    updated_at: string;
  };

  type QueueConvertToReservation = {
    /** Reservation start time. Defaults to the queue's seated_at timestamp or now. */
    start?: string;
    /** Reservation end time. Provide together with start or rely on duration/defaults. */
    end?: string;
    /** Override the tenant default dining duration (in minutes). */
    duration_minutes?: number;
    /** Optional table ID if the assignment should change during conversion. */
    table_id?: number;
    /** Optional override for customer name. */
    customer_name?: string;
    /** Optional override for customer phone. */
    customer_phone?: string;
    /** Optional customer email to store on the reservation. */
    customer_email?: string;
    /** Optional note to carry into the reservation. */
    note?: string;
  };

  type queuesCallCreateParams = {
    id: string;
  };

  type queuesCancelCreateParams = {
    id: string;
  };

  type queuesConvertToReservationCreateParams = {
    id: string;
  };

  type queuesDestroyParams = {
    id: string;
  };

  type queuesListParams = {
    /** Filter by issued date (YYYY-MM-DD) */
    date?: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
    /** Filter by status (WAITING, CALLED, SEATED, CANCELLED, NO_SHOW) */
    status?: string;
  };

  type queuesNoShowCreateParams = {
    id: string;
  };

  type queuesPartialUpdateParams = {
    id: string;
  };

  type queuesRetrieveParams = {
    id: string;
  };

  type queuesSeatCreateParams = {
    id: string;
  };

  type queuesStatsRetrieveParams = {
    /** Filter by date (YYYY-MM-DD), defaults to today */
    date?: string;
  };

  type QueueStatusEnum =
    | "WAITING"
    | "CALLED"
    | "SEATED"
    | "CANCELLED"
    | "NO_SHOW";

  type QueueStatusUpdate = {
    /** New status for the queue ticket

* `WAITING` - Waiting
* `CALLED` - Called
* `SEATED` - Seated
* `CANCELLED` - Cancelled
* `NO_SHOW` - No Show */
    status: QueueStatusEnum;
    /** Table ID to assign when seating customer */
    table_id?: number;
    /** Optional note for status change */
    note?: string;
  };

  type queuesUpdateParams = {
    id: string;
  };

  type Register = {
    id: number;
    email: string;
    password: string;
  };

  type RegisterAndCreateTenant = {
    email: string;
    password: string;
    tenant_name: string;
  };

  type reportsCashFlowRetrieveParams = {
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Start date (YYYY-MM-DD). Defaults to today minus 7 days. */
    start_date?: string;
  };

  type reportsDailySalesRetrieveParams = {
    /** Reporting date (YYYY-MM-DD), defaults to today. */
    date?: string;
    /** Top item limit (default 5). */
    top_limit?: number;
  };

  type reportsExpenseRetrieveParams = {
    /** Filter by expense category. */
    category?: string;
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Start date (YYYY-MM-DD). Defaults to today minus 30 days. */
    start_date?: string;
  };

  type reportsExportDailySalesRetrieveParams = {
    /** Reporting date (YYYY-MM-DD). Defaults to today. */
    date?: string;
    /** Export format override: csv or xlsx (default csv). Alias: `format` for backward compatibility. */
    export_format?: string;
  };

  type reportsExportRevenueRetrieveParams = {
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Export format override: csv or xlsx (default csv). Alias: `format` for backward compatibility. */
    export_format?: string;
    /** Bucket size: day, week, or month. Defaults to day. */
    period?: string;
    /** Start date (YYYY-MM-DD). Defaults to today minus 7 days. */
    start_date?: string;
  };

  type reportsProfitRetrieveParams = {
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Start date (YYYY-MM-DD). Defaults to today minus 30 days. */
    start_date?: string;
  };

  type reportsRevenueRetrieveParams = {
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Bucket size: day, week, or month. Defaults to day. */
    period?: string;
    /** Start date (YYYY-MM-DD). Defaults to today minus 7 days. */
    start_date?: string;
  };

  type reportsStaffPerformanceRetrieveParams = {
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Start date (YYYY-MM-DD). Defaults to today minus 7 days. */
    start_date?: string;
  };

  type reportsTopItemsRetrieveParams = {
    /** End date (YYYY-MM-DD). Defaults to today. */
    end_date?: string;
    /** Maximum number of items to return (1-50, default 10). */
    limit?: number;
    /** Start date (YYYY-MM-DD). Defaults to today minus 7 days. */
    start_date?: string;
  };

  type Reservation = {
    id: number;
    tenant: number;
    table: number;
    status?: ReservationStatusEnum;
    start: string;
    end: string;
    party_size?: number;
    adults?: number;
    children?: number;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    note?: string;
    duration_minutes: number;
    created_at: string;
    updated_at: string;
  };

  type ReservationAvailabilityBlock = {
    start: string;
    end: string;
    source: string;
    reference_id?: number;
    status?: string;
    note?: string;
  };

  type ReservationAvailabilityResponse = {
    date: string;
    party_size: number;
    interval_minutes: number;
    dining_duration_minutes: number;
    service_start: string;
    service_end: string;
    available_times: string[];
    slots: ReservationAvailabilitySlot[];
    table_schedules: ReservationAvailabilityTable[];
  };

  type ReservationAvailabilitySlot = {
    start: string;
    end: string;
    table_ids: number[];
    table_names: string[];
  };

  type ReservationAvailabilityTable = {
    id: number;
    name: string;
    capacity: number;
    min_party_size: number;
    blocks: ReservationAvailabilityBlock[];
  };

  type ReservationBatchStatusRequest = {
    /** List of reservation IDs scoped to the active tenant */
    ids: number[];
    /** Optional note to apply */
    note?: string;
  };

  type ReservationCreateOrder = {
    /** Customer name (defaults to reservation's customer_name) */
    customer_name?: string;
    /** Customer phone (defaults to reservation's customer_phone) */
    customer_phone?: string;
    /** Customer email (defaults to reservation's customer_email) */
    customer_email?: string;
    /** Order subtotal (auto-calculated from items if provided) */
    subtotal?: string;
    /** Tax amount */
    tax?: string;
    /** Total amount (auto-calculated as subtotal + tax if items provided) */
    total?: string;
    items?: OrderItemInput[];
    /** Staff member handling the order */
    staff_name?: string;
    /** Order notes */
    note?: string;
  };

  type ReservationList = {
    id: number;
    table: number;
    table_name: string;
    status?: ReservationStatusEnum;
    start: string;
    end: string;
    party_size: number;
    adults?: number;
    children?: number;
    customer_name: string;
    customer_phone?: string;
    duration_minutes: number;
  };

  type reservationsAvailabilityRetrieveParams = {
    /** Number of adults in the party */
    adults: number;
    /** Number of children in the party (default 0) */
    children?: number;
    /** Reservation date (YYYY-MM-DD) */
    date: string;
    /** Override the default dining duration for this lookup */
    duration_minutes?: number;
    /** Return table-level schedule details (default true) */
    include_table_schedules?: boolean;
    /** Optional comma separated list of table IDs to limit the lookup */
    table_ids?: string;
  };

  type reservationsBatchCancelCreateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type reservationsBatchConfirmCreateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type reservationsCancelCreateParams = {
    id: string;
  };

  type reservationsCompleteCreateParams = {
    id: string;
  };

  type reservationsConfirmCreateParams = {
    id: string;
  };

  type reservationsCreateOrderCreateParams = {
    id: string;
  };

  type reservationsDestroyParams = {
    id: string;
  };

  type reservationsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type reservationsMeCancelCreateParams = {
    id: string;
  };

  type reservationsMeListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type reservationsMeRetrieveParams = {
    id: string;
  };

  type reservationsNoShowCreateParams = {
    id: string;
  };

  type reservationsOrdersListParams = {
    id: string;
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type reservationsPartialUpdateParams = {
    id: string;
  };

  type reservationsRetrieveParams = {
    id: string;
  };

  type reservationsSeatCreateParams = {
    id: string;
  };

  type ReservationStatusEnum =
    | "PENDING"
    | "BOOKED"
    | "CONFIRMED"
    | "SEATED"
    | "COMPLETED"
    | "CANCELLED"
    | "NO_SHOW";

  type ReservationStatusUpdate = {
    note?: string;
  };

  type reservationsUpdateParams = {
    id: string;
  };

  type RevenueBucket = {
    period_start: string;
    period_end: string;
    gross: string;
    refunds: string;
    net: string;
    order_count: number;
  };

  type RevenueReport = {
    period: string;
    start_date: string;
    end_date: string;
    buckets: RevenueBucket[];
    totals: Record<string, any>;
  };

  type schemaJsonRetrieveParams = {
    lang?:
      | "af"
      | "ar"
      | "ar-dz"
      | "ast"
      | "az"
      | "be"
      | "bg"
      | "bn"
      | "br"
      | "bs"
      | "ca"
      | "ckb"
      | "cs"
      | "cy"
      | "da"
      | "de"
      | "dsb"
      | "el"
      | "en"
      | "en-au"
      | "en-gb"
      | "eo"
      | "es"
      | "es-ar"
      | "es-co"
      | "es-mx"
      | "es-ni"
      | "es-ve"
      | "et"
      | "eu"
      | "fa"
      | "fi"
      | "fr"
      | "fy"
      | "ga"
      | "gd"
      | "gl"
      | "he"
      | "hi"
      | "hr"
      | "hsb"
      | "hu"
      | "hy"
      | "ia"
      | "id"
      | "ig"
      | "io"
      | "is"
      | "it"
      | "ja"
      | "ka"
      | "kab"
      | "kk"
      | "km"
      | "kn"
      | "ko"
      | "ky"
      | "lb"
      | "lt"
      | "lv"
      | "mk"
      | "ml"
      | "mn"
      | "mr"
      | "ms"
      | "my"
      | "nb"
      | "ne"
      | "nl"
      | "nn"
      | "os"
      | "pa"
      | "pl"
      | "pt"
      | "pt-br"
      | "ro"
      | "ru"
      | "sk"
      | "sl"
      | "sq"
      | "sr"
      | "sr-latn"
      | "sv"
      | "sw"
      | "ta"
      | "te"
      | "tg"
      | "th"
      | "tk"
      | "tr"
      | "tt"
      | "udm"
      | "ug"
      | "uk"
      | "ur"
      | "uz"
      | "vi"
      | "zh-hans"
      | "zh-hant";
  };

  type schemaRetrieveParams = {
    format?: "json" | "yaml";
    lang?:
      | "af"
      | "ar"
      | "ar-dz"
      | "ast"
      | "az"
      | "be"
      | "bg"
      | "bn"
      | "br"
      | "bs"
      | "ca"
      | "ckb"
      | "cs"
      | "cy"
      | "da"
      | "de"
      | "dsb"
      | "el"
      | "en"
      | "en-au"
      | "en-gb"
      | "eo"
      | "es"
      | "es-ar"
      | "es-co"
      | "es-mx"
      | "es-ni"
      | "es-ve"
      | "et"
      | "eu"
      | "fa"
      | "fi"
      | "fr"
      | "fy"
      | "ga"
      | "gd"
      | "gl"
      | "he"
      | "hi"
      | "hr"
      | "hsb"
      | "hu"
      | "hy"
      | "ia"
      | "id"
      | "ig"
      | "io"
      | "is"
      | "it"
      | "ja"
      | "ka"
      | "kab"
      | "kk"
      | "km"
      | "kn"
      | "ko"
      | "ky"
      | "lb"
      | "lt"
      | "lv"
      | "mk"
      | "ml"
      | "mn"
      | "mr"
      | "ms"
      | "my"
      | "nb"
      | "ne"
      | "nl"
      | "nn"
      | "os"
      | "pa"
      | "pl"
      | "pt"
      | "pt-br"
      | "ro"
      | "ru"
      | "sk"
      | "sl"
      | "sq"
      | "sr"
      | "sr-latn"
      | "sv"
      | "sw"
      | "ta"
      | "te"
      | "tg"
      | "th"
      | "tk"
      | "tr"
      | "tt"
      | "udm"
      | "ug"
      | "uk"
      | "ur"
      | "uz"
      | "vi"
      | "zh-hans"
      | "zh-hant";
  };

  type Shift = {
    id: number;
    external_id?: string;
    tenant: number;
    employee: number;
    employee_display: string;
    job: number;
    job_name: string;
    start_time: string;
    end_time: string;
    /** Minutes. */
    break_duration?: number;
    status: ShiftStatusEnum;
    notes?: string;
    duration_minutes: number;
    created_at: string;
    updated_at: string;
  };

  type ShiftStatusEnum =
    | "scheduled"
    | "in_progress"
    | "completed"
    | "cancelled";

  type SourceEnum = "manual" | "rule";

  type StaffPerformanceEntry = {
    staff_id: number;
    staff_name: string;
    roles: string[];
    orders_handled: number;
    total_sales: string;
    average_order_value: string;
    hours_worked: number;
    shifts: number;
  };

  type StaffPerformanceReport = {
    start_date: string;
    end_date: string;
    staff: StaffPerformanceEntry[];
  };

  type StockStatusEnum = "any" | "in_stock" | "out_of_stock";

  type SwitchTenant = {
    /** UUID of the tenant to switch to */
    tenant_uuid: string;
  };

  type Table = {
    id: number;
    tenant: number;
    name: string;
    capacity: number;
    min_party_size?: number;
    zone?: number;
    zone_name: string;
    tags?: number[];
    tag_names: string[];
    features?: number[];
    feature_labels: string[];
    /** Manual table state managed by the state machine

* `AVAILABLE` - Available
* `HELD` - Held
* `OCCUPIED` - Occupied
* `DIRTY` - Needs Cleaning
* `MAINTENANCE` - Maintenance */
    state?: TargetStateEnum;
    current_state: string;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type TableBatchDeleteResponse = {
    count: number;
    hard_delete: boolean;
    /** IDs that were permanently removed */
    deleted_ids?: number[];
    /** Updated table records when performing a soft delete */
    deactivated: Table[];
  };

  type TableClosure = {
    id: number;
    tenant: number;
    table?: number;
    table_name: string;
    group?: number;
    group_name: string;
    zone?: number;
    zone_name: string;
    start: string;
    end: string;
    note?: string;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type tableClosuresDestroyParams = {
    id: string;
  };

  type tableClosuresListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tableClosuresPartialUpdateParams = {
    id: string;
  };

  type tableClosuresRetrieveParams = {
    id: string;
  };

  type tableClosuresUpdateParams = {
    id: string;
  };

  type TableCurrentSession = {
    table_id: number;
    table_name: string;
    state: string;
    current_state: string;
    current_reservation: Record<string, any>;
    today_orders: any[];
    today_payments: any[];
    session_summary: TableSessionSummary;
  };

  type TableFeature = {
    id: number;
    tenant: number;
    key: string;
    label: string;
    created_at: string;
    updated_at: string;
  };

  type tableFeaturesDestroyParams = {
    id: string;
  };

  type tableFeaturesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tableFeaturesPartialUpdateParams = {
    id: string;
  };

  type tableFeaturesRetrieveParams = {
    id: string;
  };

  type tableFeaturesUpdateParams = {
    id: string;
  };

  type TableGroup = {
    id: number;
    tenant: number;
    name: string;
    tables?: number[];
    table_names: string[];
    capacity: number;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
  };

  type tableGroupsDestroyParams = {
    id: string;
  };

  type tableGroupsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tableGroupsPartialUpdateParams = {
    id: string;
  };

  type tableGroupsRetrieveParams = {
    id: string;
  };

  type tableGroupsUpdateParams = {
    id: string;
  };

  type TableHold = {
    id: number;
    tenant: number;
    table?: number;
    table_name: string;
    group?: number;
    group_name: string;
    start: string;
    end: string;
    reason?: string;
    held_by?: string;
    expires_at?: string;
    created_at: string;
    updated_at: string;
  };

  type tableHoldsDestroyParams = {
    id: string;
  };

  type tableHoldsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tableHoldsPartialUpdateParams = {
    id: string;
  };

  type tableHoldsRetrieveParams = {
    id: string;
  };

  type tableHoldsUpdateParams = {
    id: string;
  };

  type TableQueueStatus = {
    active_ticket: Record<string, any>;
    waiting_count: number;
    next_waiting_ticket: Record<string, any>;
  };

  type TableRealTimeStatus = {
    table_id: number;
    table_name: string;
    state: string;
    current_state: string;
    queue_status: TableQueueStatus;
    current_reservation: Record<string, any>;
    today_orders: any[];
    today_payments: any[];
    session_summary: TableSessionSummary;
  };

  type tablesBatchCreateCreateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tablesBatchUpdatePartialUpdateParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tablesCurrentSessionRetrieveParams = {
    id: string;
  };

  type tablesDestroyParams = {
    id: string;
  };

  type TableSessionSummary = {
    total_orders: number;
    total_revenue: string;
    total_paid: string;
    outstanding_balance: string;
    is_occupied: boolean;
  };

  type tablesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tablesPartialUpdateParams = {
    id: string;
  };

  type tablesRealTimeStatusRetrieveParams = {
    id: string;
  };

  type tablesRetrieveParams = {
    id: string;
  };

  type TableStateTransition = {
    target_state: TargetStateEnum;
    reason?: string;
    metadata?: Record<string, any>;
  };

  type tablesTransitionStateCreateParams = {
    id: string;
  };

  type tablesUpdateParams = {
    id: string;
  };

  type TableTag = {
    id: number;
    tenant: number;
    name: string;
    created_at: string;
    updated_at: string;
  };

  type tableTagsDestroyParams = {
    id: string;
  };

  type tableTagsListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tableTagsPartialUpdateParams = {
    id: string;
  };

  type tableTagsRetrieveParams = {
    id: string;
  };

  type tableTagsUpdateParams = {
    id: string;
  };

  type TableZone = {
    id: number;
    tenant: number;
    name: string;
    created_at: string;
    updated_at: string;
    is_active?: boolean;
  };

  type tableZonesDestroyParams = {
    id: string;
  };

  type tableZonesListParams = {
    /** A page number within the paginated result set. */
    page?: number;
    /** Number of results to return per page. */
    page_size?: number;
  };

  type tableZonesPartialUpdateParams = {
    id: string;
  };

  type tableZonesRetrieveParams = {
    id: string;
  };

  type tableZonesUpdateParams = {
    id: string;
  };

  type TargetStateEnum =
    | "AVAILABLE"
    | "HELD"
    | "OCCUPIED"
    | "DIRTY"
    | "MAINTENANCE";

  type Tenant = {
    id: number;
    uuid: string;
    name: string;
    location?: string;
    description?: string;
    business_hours?: string;
    parking_information?: string;
    phone_number?: string;
    image_url?: string;
    reservation_slot_interval_minutes?: number;
    reservation_start_time?: string;
    reservation_end_time?: string;
    default_dining_duration_minutes?: number;
    max_party_size?: number;
    created_at: string;
    updated_at: string;
  };

  type TenantClosureSettings = {
    regular_closed_weekdays: number[];
    special_closures?: ClosurePeriod[];
  };

  type TenantDetail = {
    id: number;
    uuid: string;
    name: string;
    location?: string;
    description?: string;
    business_hours?: string;
    parking_information?: string;
    phone_number?: string;
    image_url?: string;
    reservation_slot_interval_minutes?: number;
    reservation_start_time?: string;
    reservation_end_time?: string;
    default_dining_duration_minutes?: number;
    max_party_size?: number;
    created_at: string;
    updated_at: string;
    member_count: number;
    owner_count: number;
    admin_count: number;
  };

  type TenantGeneralSettings = {
    /** Language code following Django's LANGUAGES setting (e.g., en-us). */
    language?: string;
    /** IANA timezone string (e.g., UTC, Asia/Taipei). */
    timezone?: string;
  };

  type TenantInvitationAccept = {
    token: string;
  };

  type TenantInvitationCreate = {
    id: number;
    tenant: number;
    email: string;
    role: TenantInvitationRoleEnum;
    token: string;
    status: InvitationStatusEnum;
    expires_at: string;
    created_at: string;
  };

  type TenantInvitationResend = {
    tenant_uuid: string;
    invitation_id: number;
  };

  type TenantInvitationRoleEnum = "admin" | "member";

  type TenantMembershipManage = {
    id: number;
    tenant: number;
    user_id: number;
    user_email: string;
    user_name: string;
    is_active: boolean;
    deactivated_at: string;
    role: TenantInvitationRoleEnum;
    created_at: string;
    updated_at: string;
  };

  type tenantMembershipsDestroyParams = {
    /** Force deletion by cleaning up active assignments. If true, cancels future shifts, auto clock-out attendance, and nullifies staff references on unsettled orders. */
    force?: boolean;
    /** A unique integer value identifying this tenant membership. */
    id: number;
  };

  type tenantMembershipsPartialUpdateParams = {
    /** A unique integer value identifying this tenant membership. */
    id: number;
  };

  type TenantOwnershipTransfer = {
    admin_user_id: number;
    tenant_uuid: string;
    previous_owner_user_id: number;
    previous_owner_email: string;
    new_owner_user_id: number;
    new_owner_email: string;
  };

  type TenantReservationSettings = {
    reservation_slot_interval_minutes?: number;
    default_dining_duration_minutes?: number;
    max_party_size?: number;
  };

  type tenantsDestroyParams = {
    uuid: string;
  };

  type tenantsInvitationsCreateParams = {
    /** Tenant UUID */
    tenant_pk: string;
    tenant_uuid: string;
  };

  type tenantsInvitationsDestroyParams = {
    /** A unique integer value identifying this tenant invitation. */
    id: number;
    /** Tenant UUID */
    tenant_pk: string;
    tenant_uuid: string;
  };

  type tenantsInvitationsListParams = {
    /** Tenant UUID */
    tenant_pk: string;
    tenant_uuid: string;
  };

  type tenantsInvitationsPartialUpdateParams = {
    /** A unique integer value identifying this tenant invitation. */
    id: number;
    /** Tenant UUID */
    tenant_pk: string;
    tenant_uuid: string;
  };

  type tenantsInvitationsRetrieveParams = {
    /** A unique integer value identifying this tenant invitation. */
    id: number;
    /** Tenant UUID */
    tenant_pk: string;
    tenant_uuid: string;
  };

  type tenantsPartialUpdateParams = {
    uuid: string;
  };

  type tenantsRetrieveParams = {
    uuid: string;
  };

  type tenantsTransferOwnershipCreateParams = {
    uuid: string;
  };

  type tenantsUpdateParams = {
    uuid: string;
  };

  type TimeEntry = {
    id: number;
    external_id?: string;
    tenant: number;
    shift?: number;
    employee: number;
    employee_display: string;
    job: number;
    job_name: string;
    clock_in?: string;
    clock_out?: string;
    /** Minutes. */
    break_time?: number;
    note?: string;
    clock_in_source: string;
    clock_out_source: string;
    regular_hours: string;
    overtime_hours: string;
    hourly_wage: string;
    total_wage: string;
    approved_by: number;
    approved_at: string;
    created_at: string;
    updated_at: string;
  };

  type TokenObtainPair = {
    email: string;
    password: string;
    access: string;
    refresh: string;
  };

  type TokenRefresh = {
    access: string;
    refresh: string;
  };

  type TopItem = {
    name: string;
    category: string;
    quantity: number;
    total: string;
  };

  type TopItemsReport = {
    start_date: string;
    end_date: string;
    limit: number;
    items: TopItem[];
  };

  type TriggerTypeEnum = "ALWAYS" | "MENU_ITEM" | "ORDER_AMOUNT" | "CATEGORY";

  type TypeEnum = "custom" | "smart" | "combo";

  type User = {
    id: number;
    email: string;
    name?: string;
    /** Current active tenant UUID for this user */
    current_tenant: string;
    created_at: string;
  };

  type usersRetrieveParams = {
    /** A unique integer value identifying this user. */
    id: number;
  };

  type VoidEntry = {
    /** Reason for voiding this entry */
    void_reason: string;
  };
}
