import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import filterReducer from '../features/filters/filterSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});

