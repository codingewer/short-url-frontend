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
      const response = await axios.put(`${apiUrl}/help/updatestatus/`, data, {
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
        state.items.unshift(action.payload)
      })
      .addCase(NewHelpRequestAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(NewHelpRequestAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
      })
      .addCase(GetHelpRequestsByUserAsync.fulfilled, (state, action) => {
        state.success= true;
        state.loading = false;
        state.items = action.payload;
      }) 
      .addCase(GetHelpRequestsByUserAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(GetHelpRequestsByUserAsync.rejected, (state, action) => {
        state.error = "hata";
        state.loading = false;
        state.success = false;
      })
      .addCase(GetHelpRequestsByStatusAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(GetHelpRequestsByStatusAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(GetHelpRequestsByStatusAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
      })
      .addCase(UpdateHelpRequestStatusAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.ID !== action.payload.ID
        )
      })
      .addCase(UpdateHelpRequestStatusAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(UpdateHelpRequestStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Bir hata oluştu";
      });
  },
});

export default HelpSlice.reducer;
