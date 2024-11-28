import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    header: "#2e2e30",
    main: "#3f3c40",
    chat: "#252325",
    chatMessage: "#3a3a3a",
    input: "#454545",
    button: "#4f4d81",
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        update: (state, action) => {
            state = {...state, ...action.payload};
        }
    }
});

export const {update} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;