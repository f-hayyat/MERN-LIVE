import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminUsersReducer from "./slices/adminUsersSlice";
import adminProductsReducer from "./slices/adminProductsSlice";
import adminOrdersReducer from "./slices/adminOrdesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        adminUsers: adminUsersReducer,
        adminProducts: adminProductsReducer,
        adminOrders: adminOrdersReducer,
    },
});

export default store;
