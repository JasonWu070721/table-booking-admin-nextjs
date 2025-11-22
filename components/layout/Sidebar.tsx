"use client";

import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resources, type ResourceItem } from "@/config/resources";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
}

/**
 * Sidebar component with mini variant drawer functionality
 * Supports expand/collapse with smooth animations and nested menu items
 * Auto-expands sidebar when menu icon is clicked in collapsed state
 *
 * @evaluated 2025-11-22 (Taiwan Time)
 */
export default function Sidebar({ open, onClose, onOpen }: SidebarProps) {
    const theme = useTheme();
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const handleToggleExpand = (itemName: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemName]: !prev[itemName],
        }));
    };

    const handleMenuItemClick = (item: ResourceItem) => {
        // If sidebar is collapsed, open it first
        if (!open) {
            onOpen();
            // If item has children, expand it
            if (item.children && item.children.length > 0) {
                setExpandedItems((prev) => ({
                    ...prev,
                    [item.name]: true,
                }));
            }
        } else {
            // If sidebar is open and item has children, toggle expand
            if (item.children && item.children.length > 0) {
                handleToggleExpand(item.name);
            }
        }
    };

    const renderMenuItem = (item: ResourceItem, isNested = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems[item.name] ?? false;
        const isSelected = pathname === item.route || (hasChildren && item.children?.some(child => pathname.startsWith(child.route)));

        return (
            <div key={item.name}>
                <ListItem disablePadding sx={{ display: "block", pl: isNested ? 2 : 0 }}>
                    {hasChildren ? (
                        <ListItemButton
                            selected={isSelected}
                            onClick={() => handleMenuItemClick(item)}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                          justifyContent: "initial",
                                      }
                                    : {
                                          justifyContent: "center",
                                      },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: "center",
                                    },
                                    open
                                        ? {
                                              mr: 3,
                                          }
                                        : {
                                              mr: "auto",
                                          },
                                ]}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                sx={[
                                    open
                                        ? {
                                              opacity: 1,
                                          }
                                        : {
                                              opacity: 0,
                                          },
                                ]}
                            />
                            {open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                    ) : (
                        <Link
                            href={item.route}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItemButton
                                selected={pathname === item.route}
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                              justifyContent: "initial",
                                          }
                                        : {
                                              justifyContent: "center",
                                          },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: "center",
                                        },
                                        open
                                            ? {
                                                  mr: 3,
                                              }
                                            : {
                                                  mr: "auto",
                                              },
                                    ]}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    sx={[
                                        open
                                            ? {
                                                  opacity: 1,
                                              }
                                            : {
                                                  opacity: 0,
                                              },
                                    ]}
                                />
                            </ListItemButton>
                        </Link>
                    )}
                </ListItem>

                {/* Nested children */}
                {hasChildren && (
                    <Collapse in={isExpanded && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children?.map((child) => renderMenuItem(child, true))}
                        </List>
                    </Collapse>
                )}
            </div>
        );
    };

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={onClose}>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {resources.map((item) => renderMenuItem(item))}
            </List>
        </Drawer>
    );
}
