import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Async thunk to create a checkout session
export const createCheckoutSession = createAsyncThunk(
    "checkout/createCheckoutSession",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/checkout`,
                checkoutData,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// create Slice
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.loading = false;
                state.checkoutSession = action.payload;
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default checkoutSlice.reducer;