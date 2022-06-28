import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { MainState } from "./store";

interface FilterState {
    value: string;
}

const initialState: FilterState = {
    value: ""
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const { changeFilter } = filterSlice.actions;
export const selectFilter = (state: MainState) => state.filter.value;
export default filterSlice.reducer;
