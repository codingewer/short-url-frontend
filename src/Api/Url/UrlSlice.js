import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewUrlAsync = createAsyncThunk("url/NewUrlAsync", async (data) => {
  const response = await axios.post(`${apiUrl}/url/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const GetUrlByCreatedByAsync = createAsyncThunk(
  "urls/GetUrlByCreatedByAsync",
  async (userName) => {
    const response = await axios.get(`${apiUrl}/url/getbycreatedby/${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const DeleteUrlByIdAsync = createAsyncThunk(
  "urls/DeleteUrlByIdAsync",
  async (id) => {
    const response = await axios.delete(`${apiUrl}/url/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const GetUrlByShortenedUrlAsync = createAsyncThunk(
    "urls/GetUrlByShortenedUrlAsync",
    async (shortenedUrl) => {
        const response = await axios.get(`${apiUrl}/url/get/${shortenedUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
)

const UrlSlice = createSlice({
  name: "urls",
  initialState: {
    items:[],
    loading: false,
    error: null,
    user: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(NewUrlAsync.fulfilled, (state, action) => {
      state.success = true;
    })
    .addCase(NewUrlAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
    })
    .addCase(GetUrlByCreatedByAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.user = action.payload;
    })
    .addCase(GetUrlByCreatedByAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
    })
    .addCase(DeleteUrlByIdAsync.fulfilled, (state, action) => {
        state.success = true;
    })
    .addCase(DeleteUrlByIdAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
    })
    .addCase(GetUrlByShortenedUrlAsync.fulfilled, (state, action) => {
        state.user = action.payload;
    })
    .addCase(GetUrlByShortenedUrlAsync.rejected, (state, action) => {
        state.error = action.payload.ERROR;
    })
  },
});

export default UrlSlice.reducer;
