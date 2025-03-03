import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/adit/:id",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/products/get",
  async (formData) => {
    const response = await axios.get(
      "http://localhost:3000/api/admin/products/get"
    );

    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/delete/:id",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/products/delete/${id}`
    );

    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
