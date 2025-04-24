import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
	"admin/fetchAllOrders",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/admin/orders`,
				{
					headers: {
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

// Update order delivery status
export const updateOrderDeliveryStatus = createAsyncThunk(
	"admin/updateOrderDeliveryStatus",
	async ({ id, status }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_BASE_URL}/api/admin/orders/${id}`,
				{ status },
				{
					headers: {
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

// Delete order
export const deleteOrder = createAsyncThunk(
    "admin/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/api/admin/orders/${id}`,
                {
                    headers: {
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

const initialState = {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
    success: false,
};
// Admin orders slice
const adminOrdersSlice = createSlice({
    name: "adminOrders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalOrders = action.payload.length;
                state.totalSales = action.payload.reduce((acc, order) => acc + order.totalPrice, 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateOrderDeliveryStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrderDeliveryStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex((order) => order._id === action.payload.order._id);
                if (index !== -1) {
                    state.orders[index] = action.payload.order;
                }
            })
            .addCase(updateOrderDeliveryStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
}); 

export default adminOrdersSlice.reducer;