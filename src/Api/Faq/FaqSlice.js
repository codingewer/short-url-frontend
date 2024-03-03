import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const GetAllFaqsAsync = createAsyncThunk(
  "faqs/GetAllFaqsAsync",
  async () => {
    const response = await axios.get(
      `${apiUrl}/faq/getall`
    );
    return response.data;
  }
);

//get faq by id
export const GetFaqByIdAsync = createAsyncThunk(
  "faqs/GetFaqByIdAsync",
  async (id) => {
    const response = await axios.get(
      `${apiUrl}/faq/getbyid/${id}`
    );
    return response.data;
  })

//Update Faq by id
export const UpdateFaqByIdAsync = createAsyncThunk(
  "faqs/UpdateFaqByIdAsync",
  async (data) => {
    const response = await axios.put(
      `${apiUrl}/faq/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  })

  //Create new faq
  export const CreateNewFaqAsync = createAsyncThunk(
    "faqs/CreateNewFaqAsync",
    async (data) => {
      const response = await axios.post(
        `${apiUrl}/faq/new`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    })

// delete faq by id
export const DeleteFaqByIdAsync = createAsyncThunk(
  "faqs/DeleteFaqByIdAsync",
  async (id) => {
    const response = await axios.delete(
      `${apiUrl}/faq/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  })

const FaqSlice = createSlice({
  name: "faqs",
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
      .addCase(GetAllFaqsAsync.fulfilled, (state, action) => {
        state.success = true;
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(GetAllFaqsAsync.pending, (state) => {
        state.loading = true;
        state.items = [];
      })
      .addCase(GetAllFaqsAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(GetFaqByIdAsync.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(GetFaqByIdAsync.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(GetFaqByIdAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(UpdateFaqByIdAsync.fulfilled, (state, action) => {
        state.postsuccess = true;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UpdateFaqByIdAsync.pending, (state, action) => {
        state.loading = true;
        state.data = null;
        state.postsuccess = false;
      })
      .addCase(UpdateFaqByIdAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
        state.postsuccess = false;
      })
      .addCase(CreateNewFaqAsync.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
        state.items !== null ? state.items.push(action.payload) : state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(CreateNewFaqAsync.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(CreateNewFaqAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      })
      .addCase(DeleteFaqByIdAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        //remove from items
        state.items = state.items.filter((item) => item.ID !== action.payload.ID);
      })
      .addCase(DeleteFaqByIdAsync.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(DeleteFaqByIdAsync.rejected, (state, action) => {
        state.error = "Bir sorun oluştu";
        state.loading = false;
      });
  },
});

export default FaqSlice.reducer;
