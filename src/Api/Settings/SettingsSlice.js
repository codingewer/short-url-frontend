import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const GetSiteDataBySiteName = createAsyncThunk(
  "settings/GetSiteDataBySiteName",
  async () => {
    const response = await axios.get(
      `${apiUrl}/sitesettings/getbysite/short-url`
    );
    return response.data;
  }
);

export const UpdateSiteDataBySiteName = createAsyncThunk(
  "settings/UpdateSiteDataBySiteName",
  async (data) => {
    const response = await axios.put(
      `${apiUrl}/sitesettings/update/short-url`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const SettingsSlice = createSlice({
  name: "settings",
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
      .addCase(GetSiteDataBySiteName.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GetSiteDataBySiteName.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSiteDataBySiteName.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(UpdateSiteDataBySiteName.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(UpdateSiteDataBySiteName.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateSiteDataBySiteName.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      });
  },
});

export default SettingsSlice.reducer;
