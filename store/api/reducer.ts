import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "@store/store";
import { HYDRATE } from "next-redux-wrapper";
import axiosObj from "axios";
import { AnyAction } from "redux";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const axios = axiosObj.create({
  baseURL: baseUrl,
});

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.access_token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  extractRehydrationInfo(action: AnyAction, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export default apiSlice.reducer;
