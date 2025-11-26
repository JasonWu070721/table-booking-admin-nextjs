// src/lib/refine/dataProvider.ts
import type {
    CreateParams,
    DataProvider,
    DeleteOneParams,
    GetListParams,
    GetOneParams,
    UpdateParams,
} from "@refinedev/core";

import * as TablesApi from "../../generated/tables/tables";
import * as ReservationsApi from "../../generated/reservations/reservations";
import * as MenusApi from "../../generated/menus/menus";
import * as CategoriesApi from "../../generated/categories/categories";
import * as CustomersApi from "../../generated/customers/customers";
import * as OrdersApi from "../../generated/orders/orders";
import * as CouponsApi from "../../generated/coupons/coupons";
import * as LoyaltyApi from "../../generated/loyalty/loyalty";
// ...add other domain imports here when new resources are wired up

const tablesApi = TablesApi.getTables();
const reservationsApi = ReservationsApi.getReservations();
const menusApi = MenusApi.getMenus();
const categoriesApi = CategoriesApi.getCategories();
const customersApi = CustomersApi.getCustomers();
const ordersApi = OrdersApi.getOrders();
const couponsApi = CouponsApi.getCoupons();
const loyaltyApi = LoyaltyApi.getLoyalty();

type ResourceConfig = Partial<{
    getList: Function;
    getOne: Function;
    create: Function;
    update: Function;
    deleteOne: Function;
}>;

// Map refine resource names to Orval-generated functions
const resourceMap: Record<string, ResourceConfig> = {
    tables: {
        getList: tablesApi.tablesList,
        create: tablesApi.tablesCreate,
        getOne: tablesApi.tablesRetrieve,
        update: tablesApi.tablesUpdate,
        deleteOne: tablesApi.tablesDestroy,
    },
    "table-zones": {
        getList: tablesApi.tableZonesList,
        create: tablesApi.tableZonesCreate,
        getOne: tablesApi.tableZonesRetrieve,
        update: tablesApi.tableZonesUpdate,
        deleteOne: tablesApi.tableZonesDestroy,
    },
    reservations: {
        getList: reservationsApi.reservationsList,
        create: reservationsApi.reservationsCreate,
        getOne: reservationsApi.reservationsRetrieve,
        update: reservationsApi.reservationsUpdate,
        deleteOne: reservationsApi.reservationsDestroy,
    },
    menus: {
        getList: menusApi.menusList,
        create: menusApi.menusCreate,
        getOne: menusApi.menusRetrieve,
        update: menusApi.menusUpdate,
        deleteOne: menusApi.menusDestroy,
    },
    categories: {
        getList: categoriesApi.categoriesList,
        create: categoriesApi.categoriesCreate,
        getOne: categoriesApi.categoriesRetrieve,
        update: categoriesApi.categoriesUpdate,
        deleteOne: categoriesApi.categoriesDestroy,
    },
    customers: {
        getList: customersApi.customersList,
        getOne: customersApi.customersRetrieve,
        create: customersApi.customersCreate,
        update: customersApi.customersPartialUpdate,
        deleteOne: customersApi.customersDestroy,
    },
    orders: {
        getList: ordersApi.ordersList,
        getOne: ordersApi.ordersRetrieve,
        create: ordersApi.ordersCreate,
        update: ordersApi.ordersPartialUpdate,
        deleteOne: ordersApi.ordersDestroy,
    },
    coupons: {
        getList: couponsApi.couponsList,
        getOne: couponsApi.couponsRetrieve,
        create: couponsApi.couponsCreate,
        update: couponsApi.couponsPartialUpdate,
        deleteOne: couponsApi.couponsDestroy,
    },
    loyalty: {
        getList: loyaltyApi.loyaltyProgramsList,
        create: loyaltyApi.loyaltyProgramsCreate,
    },
    // ...other resources (employees, revenue-centers, ...)
};

export const orvalDataProvider: DataProvider = {
    // List endpoint /api/{resource}?limit=&offset=
    getList: async ({ resource, pagination, filters, sorters }: GetListParams) => {
        const conf = resourceMap[resource];
        if (!conf?.getList) {
            throw new Error(`getList not implemented for resource: ${resource}`);
        }

        const page = pagination?.current ?? 1;
        const pageSize = pagination?.pageSize ?? 20;

        // Build query params from refine filters/sorters
        const params: Record<string, any> = {
            // DRF supports both offset/limit and page/page_size across resources
            limit: pageSize,
            offset: (page - 1) * pageSize,
            page,
            page_size: pageSize,
        };

        filters?.forEach((filter) => {
            const { field, value } = filter;
            if (value === undefined || value === null || value === "") return;
            params[field] = value;
        });

        if (sorters && sorters.length > 0) {
            params["ordering"] = sorters
                .map((s) => (s.order === "desc" ? `-${s.field}` : s.field))
                .join(",");
        }

        // Orval signatures come from schema.yaml; ignore type mismatch here
        // @ts-ignore
        const response = await conf.getList(params);

        const rawData = (response as any).data ?? response;
        const data =
            Array.isArray(rawData)
                ? rawData
                : Array.isArray(rawData?.results)
                    ? rawData.results
                    : Array.isArray(rawData?.data?.results)
                        ? rawData.data.results
                        : [];

        const total =
            (response as any).meta?.count ??
            rawData?.count ??
            rawData?.data?.count ??
            data.length;

        return {
            data,
            total,
        };
    },

    getOne: async ({ resource, id }: GetOneParams) => {
        const conf = resourceMap[resource];
        if (!conf?.getOne) {
            throw new Error(`getOne not implemented for resource: ${resource}`);
        }

        // @ts-ignore: signature depends on generated API
        const response = await conf.getOne(String(id));
        const data = (response as any).data ?? response;
        return { data };
    },

    create: async ({ resource, variables }: CreateParams) => {
        const conf = resourceMap[resource];
        if (!conf?.create) {
            throw new Error(`create not implemented for resource: ${resource}`);
        }

        // @ts-ignore: signature depends on generated API
        const response = await conf.create(variables);
        const data = (response as any).data ?? response;
        return { data };
    },

    update: async ({ resource, id, variables }: UpdateParams) => {
        const conf = resourceMap[resource];
        if (!conf?.update) {
            throw new Error(`update not implemented for resource: ${resource}`);
        }

        // @ts-ignore: signature depends on generated API
        const response = await conf.update(String(id), variables);
        const data = (response as any).data ?? response;
        return { data };
    },

    deleteOne: async ({ resource, id }: DeleteOneParams) => {
        const conf = resourceMap[resource];
        if (!conf?.deleteOne) {
            throw new Error(`deleteOne not implemented for resource: ${resource}`);
        }

        // @ts-ignore: signature depends on generated API
        const response = await conf.deleteOne(String(id));
        const data = (response as any).data ?? response ?? { id };
        return { data };
    },

    // other methods (getMany, createMany, custom) can be added as needed
};
