import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_API}`
})

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
}


export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryExtended,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    tagTypes: ["product"],
    endpoints: () => ({})
})