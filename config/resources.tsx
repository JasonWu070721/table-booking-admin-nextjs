import {
    Dashboard,
    TableRestaurant,
    RestaurantMenu,
    ReceiptLong,
    Layers,
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
        name: "tables",
        label: "Table Management",
        icon: <TableRestaurant />,
        route: "/tables",
        children: [
            {
                name: "table",
                label: "Table",
                icon: <Layers />,
                route: "/tables",
            },
            {
                name: "table-zones",
                label: "Zone",
                icon: <Layers />,
                route: "/tables/zones",
            },
        ],
    },
    {
        name: "menus",
        label: "Menu Management",
        icon: <RestaurantMenu />,
        route: "/menus",
    },
    {
        name: "orders",
        label: "Order Management",
        icon: <ReceiptLong />,
        route: "/orders",
    },
];
