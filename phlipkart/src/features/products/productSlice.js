import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            console.log('fetching products')
        }
    }
});


export const { getProducts } = productSlice.actions;
export default productSlice.reducer;
