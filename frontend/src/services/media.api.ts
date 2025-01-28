import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiMedia = createApi({
  reducerPath: "apiMedia",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Media APIs
    getAllMedia: builder.query({
      query: () => "medias/", // Get all media
    }),
    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: "medias/upload", // Upload media
        method: "POST",
        body: formData,
      }),
    }),
    deleteMedia: builder.mutation({
      query: (id) => ({
        url: `medias/${id}`, // Delete media by ID
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // Media
  useGetAllMediaQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
} = apiMedia;
