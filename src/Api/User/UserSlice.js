import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const NewUserAsync = createAsyncThunk(
  "users/NewUserAsync",
  async (data) => {
    const res = await axios.post(`${apiUrl}/user/new`, data);
    return res.data;
  }
);

export const GetUserByIDAsync = createAsyncThunk(
  "users/GetUserByUserNameAsync",
  async () => {
    const res = await axios.get(`${apiUrl}/user/getbyId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const ForgotPasswordAsync = createAsyncThunk(
  "users/ForgotPasswordAsync",
  async (data) => {
    const res = await axios.post(`${apiUrl}/user/forgotpassword`, data);
    return res.data;
  }
);

export const ResetPasswordAsync = createAsyncThunk(
  "users/ResetPasswordAsync",
  async (data, token) => {
    const res = await axios.post(`${apiUrl}/user/resetpassword/${token}`, data);
    return res.data;
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    userrealtime: null,
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
        state.loading = false;
        localStorage.setItem("logined", true);
      })
      .addCase(LoginAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        console.log(action);
        state.error =
          "Giriş başarısız şifrenizi ve Kullanıcı adınızı kontrol edin";
        state.success = false;
        state.loading = false;
      })
      .addCase(GetUserByIDAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userrealtime = action.payload;
      })
      .addCase(GetUserByIDAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(GetUserByIDAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(UpdateUserAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(UpdateUserAsync.rejected, (state, action) => {
        state.error = "Bilgiler güncellenirken hata oluştu";
        state.success = false;
        state.loading = false;
      })
      .addCase(UpdatePasswordAsync.fulfilled, (state, action) => {
        state.success = true;
        console.log(action);
        state.loading = false;
      })
      .addCase(UpdatePasswordAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(UpdatePasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Eski şifre hatalı";
      })
      .addCase(NewUserAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.success = true;
        state.loading = false;
        localStorage.setItem("logined", true);
      })
      .addCase(NewUserAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(NewUserAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error =
          "Kayıt olunurken hata oluştu kullanıcı adı daha önce kullanılmış olabilir";
      })
      .addCase(ForgotPasswordAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        console.log("hi 1");

      })
      .addCase(ForgotPasswordAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        console.log("hi 1");
      })
      .addCase(ForgotPasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        console.log("hi 1");
        state.error = "Bir hata oluştu e-mail adresinizi kontrol edin";
      })
      .addCase(ResetPasswordAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(ResetPasswordAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(ResetPasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Bir hata oluştu";
      });
  },
});

export default UserSlice.reducer;
