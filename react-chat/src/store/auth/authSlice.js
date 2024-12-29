import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tokenService } from '../../services/tokenService';
import {fetchUserData} from "./authThunks.js";


const initialState = {
    user: null,
    isAuthorized: false,
    loading: true,
    error: null,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAction: (state) => {
            tokenService.clearTokens(); // Очистим токены
            state.user = null;
            state.isAuthorized = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthorized = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthorized = true;
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload;
                state.isAuthorized = false;
                state.loading = false;
            });
    },
});

export const { logoutAction, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
