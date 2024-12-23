import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IHistoryItem {
    from: string;
    to: string;
    text: string;
}

export interface ITranslatorState {
    history: Array<IHistoryItem>;
}

// Define the initial state using that type
const initialState: ITranslatorState = {
    history: []
}

export const translatorSlice = createSlice({
    name: 'translator',
    initialState,
    reducers: {
        saveHistory: (state, action: PayloadAction<IHistoryItem>) => {
            state.history = [...state.history, action.payload];
        },
        getHistory: (state) => {
            return state.history;
        }
    }
})

export const { saveHistory } = translatorSlice.actions

export const translator = translatorSlice.reducer