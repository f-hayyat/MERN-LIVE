import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get userinfo and token from local storage
const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// check for existing guest ID in local storage , otherwise create a new one
const initialGuestId =
    localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
                userData
            );
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
                userData
            );
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            localStorage.setItem("userToken", response.data.token);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

// createSlice for auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; // reset guest ID
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); // update guest ID in local storage
        },
        generateNewGuestId: (state) => {
            const newGuestId = `guest_${new Date().getTime()}`;
            state.guestId = newGuestId;
            localStorage.setItem("guestId", newGuestId);
        },
        extraReducers: (builder) => {
            builder
                .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(registerUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        },
    },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
