import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
    cartExtra: {
        showCart: false,
    },
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

        },
        removeFromCart: (state, action) => {
            if (state.ids.includes(action.payload)) {
                cartAdapter.removeOne(state, action.payload);
            }
            return;
        },
        increaseQuantity: (state, action) => {
            cartAdapter.updateOne(state, { id: action.payload.id, changes: action.payload.changes });
        },
        decreaseQuantity: (state, action) => {
            cartAdapter.updateOne(state, { id: action.payload.id, changes: action.payload.changes })
        },

        setCartVisibility: (state, action) => {
            state.cartExtra.showCart = !state.cartExtra.showCart;
        }
    },
});

export const { selectAll: selectCartItems, selectById: selectCartItemById } = cartAdapter.getSelectors(state => state.cart);

//to get total items incart
export const getCartLength = createSelector(
    selectCartItems,

    (items) => items.length
)

export const getCartVisibility = createSelector(
    state => state.cart,

    (cart) => {
        return cart.cartExtra.showCart;
    },
)

export const isInCart = (id) => createSelector(
    state => state.cart,
    id,
    (items, id) => (items.ids.includes(id)),
)


export const { addToCart, setCartVisibility, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;