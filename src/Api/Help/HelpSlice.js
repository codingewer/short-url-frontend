import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewHelpRequestAsync = createAsyncThunk(
  "help/NewHelpRequestAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/help/new`, data, {
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

export const GetHelpRequestsByUserAsync = createAsyncThunk(
  "help/GetHelpRequestsByUserAsync",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/help/getbyuser`, {
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

export const GetHelpRequestsByStatusAsync = createAsyncThunk(
  "help/GetHelpRequestsByStatusAsync",
  async (status) => {
    try {
      const response = await axios.get(`${apiUrl}/help/getbystatus/${status}`, {
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

export const UpdateHelpRequestStatusAsync = createAsyncThunk(
  "help/UpdateHelpRequestStatusAsync",
  async (data) => {
    try {
      const response = await axios.put(`${apiUrl}/help/updatestatus`, data, {
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

const HelpSlice = createSlice({
  name: "help",
  initialState: {
    items: [],
    loading: false,
    error: null,
    balance: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NewHelpRequestAsync.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(NewHelpRequestAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
      })
      .addCase(GetHelpRequestsByUserAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(GetHelpRequestsByUserAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
      })
      .addCase(GetHelpRequestsByStatusAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(GetHelpRequestsByStatusAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
      })
      .addCase(UpdateHelpRequestStatusAsync.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(UpdateHelpRequestStatusAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
      });
  },
});

export default HelpSlice.reducer;
