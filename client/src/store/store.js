import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import adminProductSlice from "./adminProductSlice.js";
import shopProductSlice from "./shopProductSlice.js";
import cartSlice from "./cartSlice.js";
import shopAddressSlice from "./shopAddressSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    userCart: cartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
