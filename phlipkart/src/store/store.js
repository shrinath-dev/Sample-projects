import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  fetchProducts,
} from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

store.dispatch(fetchProducts());
