import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { apiAuth } from "./apiAuth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware).concat(apiAuth.middleware),
});
 