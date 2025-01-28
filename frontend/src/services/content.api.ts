import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiContent = createApi({
  reducerPath: "apiContent",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Content APIs
    getAllContent: builder.query({
      query: () => "contents/", // Get all content
    }),
    getContentById: builder.query({
      query: (id) => `contents/${id}`, // Get content by ID
    }),
    createContent: builder.mutation({
      query: (data) => ({
        url: "contents/", // Create new content
        method: "POST",
        body: data,
      }),
    }),
    updateContent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `contents/${id}`, // Update existing content by ID
        method: "PUT",
        body: data,
      }),
    }),
    deleteContent: builder.mutation({
      query: ({ id }) => ({
        url: `contents/${id}`, // Delete content by ID
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // Content
  useGetAllContentQuery,
  useGetContentByIdQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = apiContent;
