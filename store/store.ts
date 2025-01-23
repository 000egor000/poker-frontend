import { createWrapper } from "next-redux-wrapper";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import { apiSlice } from "./api/reducer";
import rootReducer, { persistedReducer } from "./index";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

export const listenerMiddleware = createListenerMiddleware();
const isDev = process.env.NODE_ENV === "development";
export const setupStore = (reducer: any) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        //serializableCheck: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware),
  });

export function makeStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return setupStore(rootReducer);
  } else {
    const store = setupStore(persistedReducer);

    // @ts-ignore
    store.__persistor = persistStore(store);

    return store;
  }
}

export const store = setupStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<any>(makeStore, { debug: false });
