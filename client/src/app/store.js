import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./applicationSlice";

export default configureStore({
  reducer: {
    application: applicationSlice
  }
});