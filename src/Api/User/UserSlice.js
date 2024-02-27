import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewUserAsync = createAsyncThunk(
  "users/NewUserAsync",
  async (data) => {
    const res = await axios.post(
      `${apiUrl}/user/new`,
      data
      /*  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }*/
    );
    return res.data;
  }
);

export const GetUserByUserNameAsync = createAsyncThunk(
  "users/GetUserByUserNameAsync",
  async (userName) => {
    const res = await axios.get(`${apiUrl}/user/get/${userName}`);
    return res.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  "users/UpdateUserAsync",
  async (data) => {
    const res = await axios.put(`${apiUrl}/user/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const UpdatePasswordAsync = createAsyncThunk(
  "users/UpdatePasswordAsync",
  async (data) => {
    const res = await axios.put(`${apiUrl}/user/updatepassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const LoginAsync = createAsyncThunk("users/LoginAsync", async (data) => {
  const res = await axios.post(`${apiUrl}/user/login`, data);
  return res.data;
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    user: null,
    success: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.success = true;
        localStorage.setItem("logined", true);
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        console.log(action);
        state.error =
          "Giriş başarısız şifrenizi ve Kullanıcı adınızı kontrol edin";
        state.success = false;
      })
      .addCase(GetUserByUserNameAsync.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(GetUserByUserNameAsync.rejected, (state, action) => {
        state.success = false;
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(UpdateUserAsync.rejected, (state, action) => {
        state.error = "Bilgiler güncellenirken hata oluştu";
        state.success = false;
      })
      .addCase(UpdatePasswordAsync.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(UpdatePasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.error = "Eski şifre hatalı";
      })
      .addCase(NewUserAsync.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(NewUserAsync.rejected, (state, action) => {
        state.success = false;
        state.error =
          "Kayıt olunurken hata oluştu kullanıcı adı daha önce kullanılmış olabilir";
      });
  },
});

export default UserSlice.reducer;