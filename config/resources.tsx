import {
    Dashboard,
    TableRestaurant,
    RestaurantMenu,
    ReceiptLong,
    Layers,
} from "@mui/icons-material";

import PeopleIcon from '@mui/icons-material/People';

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
            {
                name: "categories",
                label: "Categories",
                icon: <Layers />,
                route: "/categories",
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
    {
        name: "customers",
        label: "Customer Management",
        icon: <PeopleIcon />,
        route: "/customers",
    },
];
