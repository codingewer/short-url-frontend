import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewBalanceRequestAsync = createAsyncThunk(
    "balance/NewBalanceRequestAsync",
    async (data, { rejectWithValue }) => {
        try {
        const response = await axios.post(
          `${apiUrl}/balance/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)

export const GetBalanceByUserIDAsync = createAsyncThunk(
    "balance/GetBalanceByUserIDAsync",
    async () => {
        try {
        const response = await axios.get(
          `${apiUrl}/balance/getbyuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    }
)

export const UpdateBalanceStatusAsync = createAsyncThunk(
    "balance/UpdateBalanceStatusAsync",
    async (status,{rejectWithValue}) => {
        try {
        const response = await axios.put(
          `${apiUrl}/balance/update/${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)

export const UpdateUserBalanceInfoAsync = createAsyncThunk(
    "balance/UpdateUserBalanceInfoAsync",
    async (data,{rejectWithValue}) => {
        try {
        const response = await axios.put(
          `${apiUrl}/balance/update`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)

export const GetByStatusBalanceRequestsAsync = createAsyncThunk(
    "balance/GetByStatusBalanceRequestsAsync",
    async (status, {rejectWithValue}) => {
        try {
        const response = await axios.get(
          `${apiUrl}/balance/getbystatus/${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
)

const BalanceSlice = createSlice({
    name: "balance",
    initialState: {
        items:[],
      loading: false,
      error: null,
      balanceRequests:[],
      balance: null,
      success: false,
      message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(NewBalanceRequestAsync.fulfilled, (state, action) => {
          state.success = true;
          state.balanceRequests.unshift(action.payload)
        })
        .addCase(NewBalanceRequestAsync.rejected, (state, action) => { 
            state.error = action.payload.ERROR;
        })
        .addCase(GetBalanceByUserIDAsync.fulfilled, (state, action) => {
            state.balanceRequests = action.payload;
        })
        .addCase(GetBalanceByUserIDAsync.rejected, (state, action) => {
            state.error = "Hata";
        })
        .addCase(UpdateBalanceStatusAsync.fulfilled, (state, action) => {
            state.success = true;
        })
        .addCase(UpdateBalanceStatusAsync.rejected, (state, action) => {
            state.error = action.payload.ERROR;
        })
        .addCase(UpdateUserBalanceInfoAsync.fulfilled, (state, action) => {
            state.success = true;
        })
        .addCase(UpdateUserBalanceInfoAsync.rejected, (state, action) => {
            state.error = action.payload.ERROR;
        })
        .addCase(GetByStatusBalanceRequestsAsync.fulfilled, (state, action) => {
            state.items = action.payload;
        })
        .addCase(GetByStatusBalanceRequestsAsync.rejected, (state, action) => {
            state.error = action.payload.ERROR;
        })
        
    },
  });

  export default BalanceSlice.reducer;