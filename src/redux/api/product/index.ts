import {api as index} from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query<PRODUCT.GetAllProductResponse, PRODUCT.GetProductByIdRequest>({
            query: () => ({
                url: '/get-item',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ["product"]
        }),
        getAllProductByCategory: build.query<PRODUCT.GetAllProductByCatResponse, PRODUCT.GetAllProductByCatRequest>({
            query: () => ({
                url: '/get-caitem',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            providesTags: ['product']
        })
    })
})

export const { useGetAllProductsQuery, useGetAllProductByCategoryQuery } = api;