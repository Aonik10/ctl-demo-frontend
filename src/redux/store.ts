import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Features/modalSlice";
import languageSlice from "./Features/languageSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        language: languageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
