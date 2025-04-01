import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const storeApi = createApi({
    reducerPath:"storeApi",
    baseQuery: fetchBaseQuery({baseUrl:"https://fakestoreapi.com"}),
    endpoints:(build)=>({
        getMenClothes:build.query({
            query:()=>"products/category/men's clothing"
        }),
        getWomenClothes:build.query({
            query:()=> "products/category/women's clothing"
        }),
        getElectronics:build.query({
            query:()=>"products/category/electronics"
        })
    })
});


export const {useGetMenClothesQuery, useGetWomenClothesQuery, useGetElectronicsQuery} = storeApi;