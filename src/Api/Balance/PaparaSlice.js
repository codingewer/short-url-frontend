import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewPaparaInfoAsync = createAsyncThunk(
  "papara/NewPaparaInfoAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/balance/papara/new`,
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

export const UpdatePaparaInfoAsync = createAsyncThunk(
  "papara/UpdatePaparaInfoAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/balance/papara/update`,
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

export const DeletePaparaInfoAsync = createAsyncThunk(
  "papara/DeletePaparaInfoAsync",
  async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/balance/papara/delete/` + id,
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

const PaparaSlice = createSlice({
  name: "papara",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NewPaparaInfoAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message= "Papara bilgileri başarıyla eklendi"
      })
      .addCase(NewPaparaInfoAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(NewPaparaInfoAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
        state.message = null;
        state.success = false;
      })
      .addCase(UpdatePaparaInfoAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message = "Papara bilgileri başarıyla güncellendi"
      })
      .addCase(UpdatePaparaInfoAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(UpdatePaparaInfoAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
        state.message = null;
        state.success = false;
      })
      .addCase(DeletePaparaInfoAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message = "Papara bilgileri başarıyla silindi"
      })
      .addCase(DeletePaparaInfoAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(DeletePaparaInfoAsync.rejected, (state, action) => {
        state.error = "Bir hata oluştu";
        state.loading = false;
        state.message = null;
        state.success = false;
      })
  },
});

export default PaparaSlice.reducer;
