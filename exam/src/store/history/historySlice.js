import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    translates: [{id: '12', from: 'en-GB', to: 'ru-RU', sourceText: 'haha', resultedText: 'хехе'}],
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        saveTranslate: (state, action) => {
            state.translates.push(action.payload);
        },
        deleteAll: (state) => {
            state.translates = [];
        },
        deleteById: (state, action) => {
            state.translates = state.translates.filter(translate => translate.id !== action.payload);
        },
    },
})

export const {saveTranslate, deleteAll, deleteById} = historySlice.actions;

export const historyReducer = historySlice.reducer;
