import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from "../../services/api/userService.js";
import {logoutAction} from "./authSlice.js";

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (_, {dispatch, rejectWithValue }) => {
        try {
            const userData = await userService.getCurrentUser();
            return userData;
        } catch (error) {
            dispatch(logoutAction())
            return rejectWithValue(error.response.data);
        }
    }
);