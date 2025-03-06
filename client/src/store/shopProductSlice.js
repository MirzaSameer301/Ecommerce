import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchFilteredProducts = createAsyncThunk(
  "/products/get",
  async () => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get`
    );
    return response.data;
  }
);

const shopProdutSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    })
    .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
  },
});

export default shopProdutSlice.reducer;
