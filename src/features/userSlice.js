import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
//import axiosInstance from "../api/axiosSetup";
const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    authenticated: false,
    loading: false,
    error: null,
}

export const userSignIn = createAsyncThunk("auth/userSignIn", async (credentials, { rejectWithValue })=>{
    try {
        const api = (await import('../api/axiosSetup')).default;
        
        console.log(api);
        
        const response = await axios.post('https://dummyjson.com/auth/login', credentials);
        console.log('sign in response', response);
        
        const { access_token } = response.data;
        return { token: access_token, user: response.data.user };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

// Check Authentication Status
export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const api = (await import('../api/axiosSetup')).default;
      const response = await axios.get('https://dummyjson.com/auth/me'); // Endpoint that checks if the session is active
      return response.data; // User data if authenticated
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

// Logout Action
export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const api = (await import('../api/axiosSetup')).default;
      await api.post('/auth/logout'); // This clears the refresh token on the server
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAccessToken: (state, action) => {
          state.token = action.payload;
        },
        logout: (state) => {
          state.user = null;
          state.token = null;
          state.authenticated = false;
        },
      },
    extraReducers: ((builder)=>{
        builder
      .addCase(userSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authenticated = true;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.authenticated = false;
      });
    })
});

export const { updateAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;