import { createSlice } from '@reduxjs/toolkit';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';

const initialState = {
    lang: 'en',
    messages: {
        en: enMessages,
        ar: arMessages,
    },
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload.lang;
            state.messages = action.payload.messages;
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
