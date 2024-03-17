import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewBalanceIBANAsync = createAsyncThunk(
  "bankinfo/NewBalanceIBANtAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/balance/info/new`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateBankInfoByIDAsync = createAsyncThunk(
    "bankinfo/UpdateBankInfoByIDAsync",
    async (data) => {
      try {
        const response = await axios.put(`${apiUrl}/balance/info/updateinfo`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    }
)

export const DeleteBankInfoByIDAsync = createAsyncThunk(
    "bankinfo/DeleteBankInfoByIDAsync",
    async (id) => {
      try {
        const response = await axios.delete(`${apiUrl}/balance/info/delete/`+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    }
)

const BankInfoSlice = createSlice({
  name: "bankinfo",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NewBalanceIBANAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message= "Yeni banka bilgileri başarıyla eklendi"
      })
      .addCase(NewBalanceIBANAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(NewBalanceIBANAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
      })
      .addCase(UpdateBankInfoByIDAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message = "Banka bilgileri başarıyla güncellendi"
      })
      .addCase(DeleteBankInfoByIDAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message = "Banka bilgileri başarıyla silindi"
      })
      .addCase(DeleteBankInfoByIDAsync.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.success = false;
        state.error = null;
      })
      .addCase(DeleteBankInfoByIDAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
      })
      .addCase(UpdateBankInfoByIDAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(UpdateBankInfoByIDAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
      })
  },
});

export default BankInfoSlice.reducer;
