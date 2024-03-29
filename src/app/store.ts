import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import { appReducer } from "./app.slice"
import { postsReducer } from "../features/posts/posts.slice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { usersReducer } from "../features/users/users.slice"

const postsPersistConfig = {
    key: "posts",
    storage,
    blacklist: ["posts"],
}

const usersPersistConfig = {
    key: "users",
    storage,
    blacklist: ["users"],
}

const rootReducer = combineReducers({
    app: appReducer,
    posts: persistReducer(postsPersistConfig, postsReducer),
    users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
