import type { ResourceItem } from "@/config/resources";

function isRouteActive(pathname: string, route: string) {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(`${route}/`);
}

export function isItemActive(item: ResourceItem, pathname: string): boolean {
    if (isRouteActive(pathname, item.route)) return true;
    return item.children?.some((child) => isItemActive(child, pathname)) ?? false;
}

export function getAutoExpandedItems(items: ResourceItem[], pathname: string) {
    const expanded: Record<string, boolean> = {};

    const walk = (item: ResourceItem): boolean => {
        const selfActive = isRouteActive(pathname, item.route);
        const childActive = item.children?.some(walk) ?? false;

        if (item.children?.length && (selfActive || childActive)) {
            expanded[item.name] = true;
        }

        return selfActive || childActive;
    };

    items.forEach(walk);

    return expanded;
}
