import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AUTH_API}/api/v1`,
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem("tokenForAuth")!);
        if( token ) {
            headers.set("Authorization", `Bearer ${token.accessToken}`);	
        }
    }
})


const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
}



export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    baseQuery: baseQueryExtended,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["user"],
    endpoints: () => ({})
})