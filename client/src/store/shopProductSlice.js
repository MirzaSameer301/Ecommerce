import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails:null
};

export const fetchFilteredProducts = createAsyncThunk(
  "/products/get",
  async ({filterParams,sortParams}) => {
    const query=new URLSearchParams({
      ...filterParams,
      sortBy:sortParams
    })
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get?${query}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:3000/api/shop/products/get/${id}`
    );

    return result?.data;
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
      }).addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProdutSlice.reducer;
