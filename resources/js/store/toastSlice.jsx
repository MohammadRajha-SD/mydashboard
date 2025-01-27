import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ToastCard from "../shared/toast/ToastCard.jsx"; // Import your custom toast card component
import toastConfig from "../config/toastConfig.jsx"; // Import your toast configuration
const initialState = {};

const notify = (options, toastsConfig) => {
    toastsConfig.config.toastId = toastsConfig.id;
    toast(<ToastCard {...options} />, toastsConfig.config); // Display toast using react-toastify
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        addToast: (state, action) => {
            const { text, type } = action.payload; // Options and config from the dispatched action
            const options = {
                text, type,
            }
            const toastsConfig = toastConfig(options);
            notify(options, toastsConfig); 
        },

        removeToast: (state, action) => {
            const id = action.payload;
            toast.dismiss(id); 
        },
    },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
