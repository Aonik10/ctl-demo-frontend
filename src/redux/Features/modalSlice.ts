import { createSlice } from "@reduxjs/toolkit";
import { TaskResponse } from "../../api/interfaces";

export interface modalState {
    display: boolean;
    task: TaskResponse | null;
}

const initialState: modalState = {
    display: false,
    task: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setDisplay: (state, action) => {
            state.display = action.payload;
        },
        setTask: (state, action) => {
            state.task = action.payload;
        },
        removeTask: (state) => {
            state.task = null;
        },
    },
});

export const { setDisplay, setTask, removeTask } = modalSlice.actions;

export default modalSlice.reducer;
