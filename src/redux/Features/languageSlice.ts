import { createSlice } from "@reduxjs/toolkit";

export interface languageState {
    current: "en" | "es";
}

const initialState: languageState = {
    current: "en",
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.current = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
