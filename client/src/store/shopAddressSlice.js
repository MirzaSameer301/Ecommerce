import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

const addNewAddress = createAsyncThunk(
  "address/addnNewAddress",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:3000/api/shop/address/add`,
      formData
    );
    return response.date;
  }
);

const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`
    );
    return response.date;
  }
);
const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.date;
  }
);
const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.date;
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = true;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
