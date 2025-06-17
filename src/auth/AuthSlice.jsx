// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUpApi, signInApi } from '../../api/authApi';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode

// Async Thunks for API calls
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signUpApi(userData);
      // Assuming backend returns user data + token on successful signup
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
      const decodedUser = jwtDecode(token); // Decode token to get user info if needed
      return { token, user: { ...user, ...decodedUser } }; // Combine user data from backend and token
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signInApi(credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
      const decodedUser = jwtDecode(token); // Decode token
      return { token, user: { ...user, ...decodedUser } };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// We won't create an async thunk for verifyEmail as it's disabled.
// If it were enabled, it would look similar to the above,
// but wouldn't typically return a new token or login the user directly.

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null, // Initialize token from local storage
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Optional: Hydrate user from token on app load if token exists
    setUserFromToken: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedUser = jwtDecode(token);
          // Assuming 'id' is available in the decoded token
          state.user = decodedUser;
          state.isAuthenticated = true;
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem('token'); // Clear invalid token
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setUserFromToken } = authSlice.actions;

export default authSlice.reducer;