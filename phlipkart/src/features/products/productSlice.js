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
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
        state.status = 'failed';
        console.log(action.error.message);
      });
  },
});

// creating selectors

export const { selectAll: selectProducts, selectById: selectProductsById } = productAdapter.getSelectors(state => state.products);

export const getCategories = createSelector(
  selectProducts,

  (products) => products.map((product) => product.category)


)

// export const {} = productSlice.actions;
export default productSlice.reducer;
