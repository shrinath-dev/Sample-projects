import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartId: null,
    cartItems: [],
    cartTotal: 0,
    cartLength: 0,
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartId: (state, action) => {
            state.cartId = action.payload;
        },

        addItem: (state, action) => {
            // check if item is already in cart 
            if (state.cartItems.find((item) => item.id === action.payload.id)) {
                return;
            }

            state.cartItems.push(action.payload);

            //update total cart item 
            state.cartLength += 1;

            //updte total cart value
            state.cartTotal += action.payload.quantity * action.payload.price;

        },

        deleteItem: (state, action) => {
            //check if item exist in cart
            state.cartItems = state.cartItems.filter((item) => {
                if (item.id === action.payload) {
                    //update cart total
                    state.cartTotal -= item.quantity * item.price;
                    state.cartLength -= 1;
                    return false;
                }
                return true;
            })
        },


        clearCart: (state, action) => {
            state.cartItems = [];
            state.cartLength = 0;
            state.cartTotal = 0;
        }
    },
});


export const { setCartId, addItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;