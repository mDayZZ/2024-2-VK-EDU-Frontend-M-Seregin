import {createSlice} from "@reduxjs/toolkit";
import storageService from "../../services/storageService/index.js";


const initialState = {
    translates: storageService.translate.getHistoryData(),
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        saveTranslate: (state, action) => {
            state.translates = [action.payload, ...state.translates];
            storageService.translate.saveHistoryData(state.translates);

        },
        deleteAll: (state) => {
            state.translates = [];
            storageService.translate.saveHistoryData(state.translates);

        },
        deleteById: (state, action) => {
            state.translates = state.translates.filter(translate => translate.id !== action.payload);
            storageService.translate.saveHistoryData(state.translates);
        },
    },
})

export const {saveTranslate, deleteAll, deleteById} = historySlice.actions;

export const historyReducer = historySlice.reducer;
