// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./applicationSlice";

export const store = configureStore({
  reducer: {
    application: applicationSlice
  }
});

export default store;
