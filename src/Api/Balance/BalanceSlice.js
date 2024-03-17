import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewBalanceRequestAsync = createAsyncThunk(
  "balance/NewBalanceRequestAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/balance/add`, data, {
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

export const GetBalanceByUserIDAsync = createAsyncThunk(
  "balance/GetBalanceByUserIDAsync",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/balance/getbyuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const UpdateBalanceStatusAsync = createAsyncThunk(
  "balance/UpdateBalanceStatusAsync",
  async (data) => {
    try {
      const response = await axios.put(
        `${apiUrl}/balance/updatestatus/${data.status}`,
        data,
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
);

export const GetByStatusBalanceRequestsAsync = createAsyncThunk(
  "balance/GetByStatusBalanceRequestsAsync",
  async (status) => {
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
      return error.response.data;
    }
  }
);


const BalanceSlice = createSlice({
  name: "balance",
  initialState: {
    items: [],
    loading: false,
    error: null,
    balanceRequests: [],
    balance: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NewBalanceRequestAsync.fulfilled, (state, action) => {
        state.success = true;
        state.items !== 0 ? state.balanceRequests.unshift(action.payload) : state.items.push(action.payload) ;
        state.loading = false;
      })
      .addCase(NewBalanceRequestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(NewBalanceRequestAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
      })
      .addCase(GetBalanceByUserIDAsync.fulfilled, (state, action) => {
        state.balanceRequests = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(GetBalanceByUserIDAsync.pending, (state) => {
        state.loading = true;
        state.balanceRequests = [];
      })
      .addCase(GetBalanceByUserIDAsync.rejected, (state, action) => {
        state.error = "Hata";
        state.loading = false;
      })
      .addCase(UpdateBalanceStatusAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        //remove item from items by ID
        state.items = state.items.filter(
          (item) => item.ID !== action.payload.ID
        )
      })
      .addCase(UpdateBalanceStatusAsync.pending, (state) => {
        state.loading = true;

      })
      .addCase(UpdateBalanceStatusAsync.rejected, (state, action) => {
        state.error = "Hata";
        state.loading = false;
      })
      .addCase(GetByStatusBalanceRequestsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(GetByStatusBalanceRequestsAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.items = [];
      })
      .addCase(GetByStatusBalanceRequestsAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
        state.success = false;
      })
  },
});

export default BalanceSlice.reducer;
