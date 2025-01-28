import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSEO = createApi({
  reducerPath: "apiSEO",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // SEO APIs
    createOrUpdateSEO: builder.mutation({
      query: (data) => ({
        url: "seos/", // Create or Update SEO data
        method: "POST",
        body: data,
      }),
    }),
    getSEO: builder.query({
      query: (url) => `seos/${url}`, // Get SEO by URL
    }),
    getAllSEO: builder.query({
      query: () => "seos/", // Get all seo
    }),
  }),
});

export const {
  // SEO
  useCreateOrUpdateSEOMutation,
  useGetSEOQuery,
  useGetAllSEOQuery,
} = apiSEO;
