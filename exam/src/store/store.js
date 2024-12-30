import {configureStore} from "@reduxjs/toolkit";
import {historyReducer, historySlice} from "./history/historySlice.js";


export const store = configureStore({
    reducer: {
        history: historyReducer,
    },
})

