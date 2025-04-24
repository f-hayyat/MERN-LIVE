import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helpers: Local Storage
const loadCartFromStorage = () => {
	const stored = localStorage.getItem("cart");
	return stored ? JSON.parse(stored) : { products: [] };
};
const saveCartToStorage = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

// BASE URL
const BASE_URL = import.meta.env.VITE_BASE_URL;
// Common headers
const getAuthHeaders = () => {
	const token = localStorage.getItem("userToken");
	return token ? { headers: { Authorization: `Bearer ${token}` } } : {}; // return empty headers if not logged in
};
// Thunks
export const fetchCart = createAsyncThunk(
	"/cart/fetchCart",
	async ({ guestId }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASE_URL}/api/cart`, {
				params: { guestId },
				...getAuthHeaders(),
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: "Fetch error" }
			);
		}
	}
);

export const addProductToCart = createAsyncThunk(
	"/cart/addProduct",
	async (
		{ guestId, productId, quantity, size, color },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/cart`,
				{ guestId, productId, quantity, size, color },
				getAuthHeaders()
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || { message: "Add error" });
		}
	}
);

export const updateProductQuantity = createAsyncThunk(
	"/cart/updateProduct",
	async (
		{ guestId, productId, quantity, size, color },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/api/cart`,
				{ guestId, productId, quantity, size, color },
				getAuthHeaders()
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: "Update error" }
			);
		}
	}
);

export const removeProductFromCart = createAsyncThunk(
	"/cart/removeProduct",
	async ({ guestId, productId, size, color }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${BASE_URL}/api/cart`, {
				data: { guestId, productId, size, color },
				...getAuthHeaders(),
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: "Delete error" }
			);
		}
	}
);

export const mergeCarts = createAsyncThunk(
	"/cart/mergeCarts",
	async ({ guestId }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/cart/merge`,
				{ guestId },
				getAuthHeaders()
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: "Merge error" }
			);
		}
	}
);

// Slice
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: loadCartFromStorage(),
		loading: false,
		error: null,
	},
	reducers: {
		clearCart: (state) => {
			state.cart = { products: [] };
			localStorage.removeItem("cart");
		},
	},
	extraReducers: (builder) => {
		const handlePending = (state) => {
			state.loading = true;
			state.error = null;
		};
		const handleFulfilled = (state, action) => {
			state.loading = false;
			state.cart = action.payload;
			saveCartToStorage(action.payload);
		};
		const handleRejected = (state, action) => {
			state.loading = false;
			state.error = action.payload?.message || "Something went wrong";
		};

		builder
			.addCase(fetchCart.pending, handlePending)
			.addCase(fetchCart.fulfilled, handleFulfilled)
			.addCase(fetchCart.rejected, handleRejected)

			.addCase(addProductToCart.pending, handlePending)
			.addCase(addProductToCart.fulfilled, handleFulfilled)
			.addCase(addProductToCart.rejected, handleRejected)

			.addCase(updateProductQuantity.pending, handlePending)
			.addCase(updateProductQuantity.fulfilled, handleFulfilled)
			.addCase(updateProductQuantity.rejected, handleRejected)

			.addCase(removeProductFromCart.pending, handlePending)
			.addCase(removeProductFromCart.fulfilled, handleFulfilled)
			.addCase(removeProductFromCart.rejected, handleRejected)

			.addCase(mergeCarts.pending, handlePending)
			.addCase(mergeCarts.fulfilled, handleFulfilled)
			.addCase(mergeCarts.rejected, handleRejected);
	},
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
