import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
    userId: null,
})



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.ids.includes(action.payload.id)) {
                alert('Item is already in cart');
                return;
            }
            cartAdapter.addOne(state, action.payload);

        }
    },
});

export const { selectAll: selectCartItems, selectById: selectCartItemId } = cartAdapter.getSelectors(state => state.cart);

//to get total items incart
export const getCartLength = createSelector(
    selectCartItems,

    (items) => items.length
)


export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;