import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiForm = createApi({
  reducerPath: "apiForm",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Forms APIs
    getAllForms: builder.query({
      query: () => "forms/",
    }),
    getFormById: builder.query({
      query: (id) => `forms/${id}`,
    }),
    createForm: builder.mutation({
      query: (data) => ({
        url: "forms/",
        method: "POST",
        body: data,
      }),
    }),
    updateForm: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `forms/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteForm: builder.mutation({
      query: (id) => ({
        url: `forms/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // Forms
  useGetAllFormsQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
} = apiForm;
