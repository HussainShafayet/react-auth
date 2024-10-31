import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosSetup";
const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
}

export const userSignIn = createAsyncThunk("auth/userSignIn", async (credentials, { rejectWithValue })=>{
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
});

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: ((builder)=>{
        builder.addCase(userSignIn.pending, (state, action)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userSignIn.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        })
        builder.addCase(userSignIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    })
});


export default userSlice.reducer;