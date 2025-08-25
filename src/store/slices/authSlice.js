import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Session expired");
    }
  }
);


    
    // TODO: Implement authentication status check
    // 1. Make a GET request to /auth/check
    // 2. Return the response data
    // 3. Handle errors appropriately
  


// TODO: Implement login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      // Handle error appropriately
      return rejectWithValue(error.response.data);
    }
    // TODO: Implement login functionality
    // 1. Make a POST request to /auth/login with credentials
    // 2. Return the response data
    // 3. Handle errors appropriately
  }
);

// TODO: Implement register thunk
export const registers = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
      try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);

      console.log("response",response)
      return response.data;
      
    } catch (error) {
      
      return rejectWithValue(error.response.data);
    }

  }
);

// TODO: Implement logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
  try {
      await axios.post(`${BASE_URL}/auth/logout`);
      return true
    } catch (error) {
      // Handle error appropriately
      return rejectWithValue(error.response.data);
      
    }
    // TODO: Implement logout functionality
    // 1. Make a POST request to /auth/logout
    // 2. Handle errors appropriately
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      // ✅ login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;


      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = null;
        state.error = action.payload;
      })

      // ✅ register
      .addCase(registers.pending, (state) => {
        state.loading = true;
      })
      .addCase(registers.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
    // TODO: Add cases for checkAuthStatus
  });
  
   export const { clearError } = authSlice.actions;
export default authSlice.reducer;