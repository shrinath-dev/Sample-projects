import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState({
  status: "idle",
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    return products;
  },
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductById: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        productAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

// creating selectors

export const { selectAll: selectProducts, selectById: selectProductsById } = productAdapter.getSelectors(state => state.products);

export const { getProductById } = productSlice.actions;
export default productSlice.reducer;
