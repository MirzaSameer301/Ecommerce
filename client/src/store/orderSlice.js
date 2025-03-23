import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  orderConfirmed: false,
  orderList: [],
  orderDetails: null,
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
export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/list/${userId}`
    );

    return response.data;
  }
);
export const getOrderDetails = createAsyncThunk(
  "/order/orderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/details/${id}`
    );

    return response.data;
  }
);
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const {resetOrderDetails}=shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
