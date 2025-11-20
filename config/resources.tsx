import {
    Dashboard,
    TableRestaurant,
    RestaurantMenu,
    ReceiptLong,
} from "@mui/icons-material";

export const resources = [
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
