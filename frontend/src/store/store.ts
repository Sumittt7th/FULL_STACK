import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiAuth } from "../services/auth.api";
import { apiUser } from "../services/user.api";
import { apiForm } from '../services/form.api';
import { apiContent } from '../services/content.api';
import { apiMedia } from '../services/media.api';
import { apiSEO } from '../services/seo.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiForm.reducerPath]: apiForm.reducer,
    [apiContent.reducerPath]: apiContent.reducer,
    [apiMedia.reducerPath]: apiMedia.reducer,
    [apiSEO.reducerPath]: apiSEO.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware,apiUser.middleware,apiForm.middleware,apiContent.middleware,apiMedia.middleware,apiSEO.middleware,),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
