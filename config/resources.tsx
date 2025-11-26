import {
    Dashboard,
    TableRestaurant,
    RestaurantMenu,
    ReceiptLong,
    Layers,
    EventSeat,
    QueueMusic,
    Payment,
    Category,
    Fastfood,
    Collections,
    Tune,
    Autorenew,
    LayersOutlined,
    People,
    CardGiftcard,
    Discount,
    Work,
    Schedule,
    TimerOutlined,
    FreeBreakfast,
    AccountBalance,
    Receipt,
    ApprovalOutlined,
    BarChart,
    TrendingUp,
    Star,
    EmojiEvents,
    MonetizationOn,
    AccountBalanceWallet,
    Settings,
    SettingsApplications,
    EventBusy,
} from "@mui/icons-material";

// Resource configuration with support for nested menu items
export interface ResourceItem {
    name: string;
    label: string;
    icon: React.ReactElement;
    route: string;
    children?: ResourceItem[];
}

export const resources: ResourceItem[] = [
    {
        name: "dashboard",
        label: "Dashboard",
        icon: <Dashboard />,
        route: "/dashboard",
    },
    {
        name: "front-of-house",
        label: "Front of House",
        icon: <TableRestaurant />,
        route: "/front-of-house",
        children: [
            {
                name: "reservations",
                label: "Reservations",
                icon: <EventSeat />,
                route: "/front-of-house/reservations",
            },
            {
                name: "queue",
                label: "Queue",
                icon: <QueueMusic />,
                route: "/front-of-house/queue",
            },
            {
                name: "orders",
                label: "Orders",
                icon: <ReceiptLong />,
                route: "/orders",
            },
            {
                name: "payments",
                label: "Payments",
                icon: <Payment />,
                route: "/front-of-house/payments",
            },
        ],
    },
    {
        name: "menu-catalog",
        label: "Menu & Catalog",
        icon: <RestaurantMenu />,
        route: "/menu-catalog",
        children: [
            {
                name: "menu-builder",
                label: "Menu Builder",
                icon: <RestaurantMenu />,
                route: "/menus",
            },
            {
                name: "categories",
                label: "Categories",
                icon: <Category />,
                route: "/categories",
            },
            {
                name: "menu-items",
                label: "Menu Items",
                icon: <Fastfood />,
                route: "/menu-catalog/menu-items",
            },
            {
                name: "item-collections",
                label: "Item Collections",
                icon: <Collections />,
                route: "/menu-catalog/item-collections",
            },
            {
                name: "product-options",
                label: "Product Options",
                icon: <Tune />,
                route: "/menu-catalog/product-options",
            },
            {
                name: "variants",
                label: "Variants",
                icon: <Autorenew />,
                route: "/menu-catalog/variants",
            },
            {
                name: "modifier-groups",
                label: "Modifier Groups",
                icon: <LayersOutlined />,
                route: "/menu-catalog/modifier-groups",
            },
        ],
    },
    {
        name: "crm",
        label: "CRM",
        icon: <People />,
        route: "/crm",
        children: [
            {
                name: "customer-directory",
                label: "Customer Directory",
                icon: <People />,
                route: "/customers",
            },
            {
                name: "loyalty",
                label: "Loyalty",
                icon: <CardGiftcard />,
                route: "/crm/loyalty",
            },
            {
                name: "coupons",
                label: "Coupons",
                icon: <Discount />,
                route: "/crm/coupons",
            },
        ],
    },
    {
        name: "workforce",
        label: "Workforce",
        icon: <Work />,
        route: "/workforce",
        children: [
            {
                name: "employees",
                label: "Employees",
                icon: <People />,
                route: "/workforce/employees",
            },
            {
                name: "jobs",
                label: "Jobs",
                icon: <Work />,
                route: "/workforce/jobs",
            },
            {
                name: "shifts",
                label: "Shifts",
                icon: <Schedule />,
                route: "/workforce/shifts",
            },
            {
                name: "time-entries",
                label: "Time Entries",
                icon: <TimerOutlined />,
                route: "/workforce/time-entries",
            },
            {
                name: "break-types",
                label: "Break Types",
                icon: <FreeBreakfast />,
                route: "/workforce/break-types",
            },
        ],
    },
    {
        name: "finance",
        label: "Finance",
        icon: <AccountBalance />,
        route: "/finance",
        children: [
            {
                name: "cash-drawers",
                label: "Cash Drawers",
                icon: <AccountBalanceWallet />,
                route: "/finance/cash-drawers",
            },
            {
                name: "e-invoice",
                label: "E-Invoice",
                icon: <Receipt />,
                route: "/finance/e-invoice",
            },
            {
                name: "approval-workflow",
                label: "Approval Workflow",
                icon: <ApprovalOutlined />,
                route: "/finance/approval-workflow",
            },
        ],
    },
    {
        name: "reports",
        label: "Reports",
        icon: <BarChart />,
        route: "/reports",
        children: [
            {
                name: "daily-sales",
                label: "Daily Sales",
                icon: <BarChart />,
                route: "/reports/daily-sales",
            },
            {
                name: "revenue-trends",
                label: "Revenue Trends",
                icon: <TrendingUp />,
                route: "/reports/revenue-trends",
            },
            {
                name: "top-items",
                label: "Top Items",
                icon: <Star />,
                route: "/reports/top-items",
            },
            {
                name: "staff-performance",
                label: "Staff Performance",
                icon: <EmojiEvents />,
                route: "/reports/staff-performance",
            },
            {
                name: "expense",
                label: "Expense",
                icon: <MonetizationOn />,
                route: "/reports/expense",
            },
            {
                name: "profit",
                label: "Profit",
                icon: <AccountBalanceWallet />,
                route: "/reports/profit",
            },
        ],
    },
    {
        name: "settings",
        label: "Settings",
        icon: <Settings />,
        route: "/settings",
        children: [
            {
                name: "general",
                label: "General",
                icon: <SettingsApplications />,
                route: "/settings/general",
            },
            {
                name: "reservation-settings",
                label: "Reservation Settings",
                icon: <EventSeat />,
                route: "/settings/reservation-settings",
            },
            {
                name: "closures",
                label: "Closures",
                icon: <EventBusy />,
                route: "/settings/closures",
            },
        ],
    },
];
