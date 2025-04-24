import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching all collections and optional filters
export const fetchProductsByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async ({
        collection,
        size,
        color,
        gender,
        brand,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        limit,
    }) => {
        const query = new URLSearchParams({});
        if (collection) query.append("collection", collection);
        if (size) query.append("size", size);
        if (color) query.append("color", color);
        if (gender) query.append("gender", gender);
        if (brand) query.append("brand", brand);
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);
        if (sortBy) query.append("sortBy", sortBy);
        if (search) query.append("search", search);
        if (category) query.append("category", category);
        if (material) query.append("material", material);
        if (limit) query.append("limit", limit);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/products?${query.toString()}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);

// Async thunk for fetching a single product by ID
export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/products/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);

// Async thunk for similar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilar",
    async (id) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/products/similar/${id}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/products/${id}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    }
);

// Create a slice for product management
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null, // store the info of the selected product
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            collection: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = {
                category: "",
                collection: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload)
                    ? action.payload
                    : []; // Ensure products is always an array
            })
            .addCase(fetchProductsByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle the update product case
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(
                    (product) => product._id === updatedProduct._id
                );
                if (index !== -1) {
                    state.products[index] = updatedProduct; // Update the product in the list
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle the fetch product by ID case
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload; // store the selected product
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload; // store similar products
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;