import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import adminProductSlice from './adminProductSlice.js'
import shopProductSlice from './shopProductSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:adminProductSlice,
    shopProducts:shopProductSlice
  },
});

export default store;
