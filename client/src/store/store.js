import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import adminProductSlice from './adminProductSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:adminProductSlice
  },
});

export default store;
