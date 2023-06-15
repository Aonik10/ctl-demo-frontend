import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Features/modalSlice";
import languageSlice from "./Features/languageSlice";
import tasksFilterSlice from "./Features/tasksFilterSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        language: languageSlice,
        tasksfilter: tasksFilterSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
