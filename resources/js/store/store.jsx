import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice.jsx'
import toastReducer from "./toastSlice.jsx";

const store = configureStore({
    reducer: {
        language: languageReducer,
        toast: toastReducer,
    },
});

export default store;
