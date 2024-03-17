import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../common/utils/create-app-async-thunk"
import { RootState } from "../../app/store"
import { handleServerNetworkError } from "../../common/utils/handle-server-network-error"
import { usersApi, UserType } from "./users.api"

const getUsers = createAppAsyncThunk<UserType[], void, { state: RootState }>("posts/getUsers", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await usersApi.getUsers()
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

type InitialStateType = {
    users: UserType[]
    filterUserNames: string[]
}
const initialState: InitialStateType = {
    users: [],
    filterUserNames: [],
}
const slice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setFilterUserNames: (state, action: PayloadAction<string[]>) => {
            state.filterUserNames = action.payload
        },
        updateUser: (state, action: PayloadAction<{ userId: number; name: string }>) => {
            const userId = action.payload.userId
            const newName = action.payload.name
            state.users = state.users.map((u) => (u.id === userId ? { ...u, name: newName } : u))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    },
})

export const usersActions = slice.actions
export const usersReducer = slice.reducer
export const usersThunks = { getUsers }
