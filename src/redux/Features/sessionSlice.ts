import { createSlice } from "@reduxjs/toolkit";

export interface sessionState {
    logged: boolean;
}

const initialState: sessionState = {
    logged: false,
};

export const sessionSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        sessionLogin: (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload));
            state.logged = action.payload.logged;
        },
        sessionLogout: (state, action) => {
            localStorage.setItem("token", "");
            state.logged = false;
        },
    },
});

export const { sessionLogin, sessionLogout } = sessionSlice.actions;

export default sessionSlice.reducer;
