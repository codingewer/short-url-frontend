import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const GetDataByUserIDAsync = createAsyncThunk(
  "chartdata/GetBalanceByUserIDAsync",
  async (days) => {
    const response = await axios.get(`${apiUrl}/seen/userseen/${days}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const ChartSlice = createSlice({
  name: "chartdata",
  initialState: {
    loading: false,
    error: null,
    data: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDataByUserIDAsync.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
      })
      .addCase(GetDataByUserIDAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
      });
  },
});

export default ChartSlice.reducer;
