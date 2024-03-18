import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const GetAllUrlfaqsAsync = createAsyncThunk(
  "urlsurlfaqs/GetAllurlsurlfaqsAsync",
  async () => {
    const response = await axios.get(
      `${apiUrl}/urlfaq/getall`
    );
    return response.data;
  }
);

//get urlfaq by id
export const GetUrlfaqByIdAsync = createAsyncThunk(
  "urlsurlfaqs/GeturlfaqByIdAsync",
  async (id) => {
    const response = await axios.get(
      `${apiUrl}/urlfaq/getbyid/${id}`
    );
    return response.data;
  })

//Update urlfaq by id
export const UpdateUrlfaqByIdAsync = createAsyncThunk(
  "urlsurlfaqs/UpdateurlfaqByIdAsync",
  async (data) => {
    const response = await axios.put(
      `${apiUrl}/urlfaq/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  })

  //Create new urlfaq
  export const CreateNewUrlfaqAsync = createAsyncThunk(
    "urlsurlfaqs/CreateNewurlfaqAsync",
    async (data) => {
      const response = await axios.post(
        `${apiUrl}/urlfaq/new`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    })

// delete urlfaq by id
export const DeleteUrlfaqByIdAsync = createAsyncThunk(
  "urlsurlfaqs/DeleteurlfaqByIdAsync",
  async (id) => {
    const response = await axios.delete(
      `${apiUrl}/urlfaq/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  })

const Urlurlfaqslice = createSlice({
  name: "urlsurlfaqs",
  initialState: {
    loading: false,
    items:[],
    error: null,
    data: null,
    success: false,
    postsuccess : false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllUrlfaqsAsync.fulfilled, (state, action) => {
        state.success = true;
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(GetAllUrlfaqsAsync.pending, (state) => {
        state.loading = true;
        state.items = [];
      })
      .addCase(GetAllUrlfaqsAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(GetUrlfaqByIdAsync.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GetUrlfaqByIdAsync.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(GetUrlfaqByIdAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(UpdateUrlfaqByIdAsync.fulfilled, (state, action) => {
        state.postsuccess = true;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UpdateUrlfaqByIdAsync.pending, (state, action) => {
        state.loading = true;
        state.data = null;
        state.postsuccess = false;
      })
      .addCase(UpdateUrlfaqByIdAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
        state.postsuccess = false;
      })
      .addCase(CreateNewUrlfaqAsync.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.items !== null ? state.items.push(action.payload) : state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(CreateNewUrlfaqAsync.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(CreateNewUrlfaqAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(DeleteUrlfaqByIdAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        //remove from items
        state.items = state.items.filter((item) => item.ID !== action.payload.ID);
      })
      .addCase(DeleteUrlfaqByIdAsync.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(DeleteUrlfaqByIdAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      });
  },
});

export default Urlurlfaqslice.reducer;
