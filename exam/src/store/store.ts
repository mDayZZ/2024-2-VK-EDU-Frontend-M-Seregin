import { configureStore } from '@reduxjs/toolkit'
import {translator} from "./translator/translatorSlice.ts";


export const store = configureStore({
    reducer: {
        translator: translator,
    },
    devTools: true
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store