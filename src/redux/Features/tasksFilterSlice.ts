import { createSlice } from "@reduxjs/toolkit";

export interface modalState {
    filter: string;
}

const initialState: modalState = {
    filter: "all",
};

export const tasksFilterSlice = createSlice({
    name: "taskFilter",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setFilter } = tasksFilterSlice.actions;

export default tasksFilterSlice.reducer;
