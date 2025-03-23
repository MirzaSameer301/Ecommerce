import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderConfirmed: false,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);

export const confirmOrder = createAsyncThunk(
  "/order/confirmOrder",
  async (orderId) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/confirm",
      { orderId }
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create New Order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })

      // Confirm Order
      .addCase(confirmOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.orderConfirmed = true;
      })
      .addCase(confirmOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderConfirmed = false;
      });
  },
});

export default shoppingOrderSlice.reducer;
