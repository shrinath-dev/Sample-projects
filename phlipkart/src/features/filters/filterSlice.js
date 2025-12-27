import { createSelector, createSlice } from "@reduxjs/toolkit";


const initialState = {
    category: 'all',
    searchTerm: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },

        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
})

export const getCategory = createSelector(state => state.filter, filter => filter.category);
export const getSearchTerm = createSelector(state => state.filter, filter => filter.searchTerm);

export const { setSearchTerm, setCategory } = filterSlice.actions;
export default filterSlice.reducer;