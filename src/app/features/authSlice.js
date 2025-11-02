import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // ✅ Read from localStorage on app load
    user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Read user too
    loading: false // ✅ Changed to false (we're not loading on init)
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      // ✅ Save to localStorage when logging in
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      // ✅ Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // ✅ Also remove user
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

export const { login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer