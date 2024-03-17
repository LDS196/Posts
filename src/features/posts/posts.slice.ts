import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../../common/utils/create-app-async-thunk"
import { RootState } from "../../app/store"
import { handleServerNetworkError } from "../../common/utils/handle-server-network-error"
import { CommentType, postsApi, PostType } from "./posts.api"
import { FormDataType } from "../../components/NewPost/NewPostForm"

const getPosts = createAppAsyncThunk<InitialPostType[], void, { state: RootState }>(
    "posts/getPosts",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        const users = getState().users.users
        try {
            const res = await postsApi.getPosts()

            return res.data.map((p) => {
                const user = users.find((u) => u.id === p.userId)
                return { ...p, favorite: false, checked: false, name: user?.name as string }
            })
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)

const getPost = createAppAsyncThunk<PostType, { id: number }, { state: RootState }>(
    "post/getPosts",
    async (arg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const res = await postsApi.getPost(arg.id)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const deletePost = createAppAsyncThunk<number, { id: number }, { state: RootState }>(
    "posts/deletePost",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        const posts = getState().posts.posts
        try {
            await postsApi.deletePost(arg.id)
            const index = posts.findIndex((p) => p.id === arg.id)
            return index
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const createPost = createAppAsyncThunk<InitialPostType, FormDataType, { state: RootState }>(
    "posts/createPost",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        const users = getState().users.users
        const posts = getState().posts.posts
        const user = users.find((u) => u.name === arg.name)
        try {
            await postsApi.createPost({ userId: user?.id as number, title: arg.title, body: arg.body })
            return { ...arg, favorite: false, checked: false, id: posts.length, userId: user?.id as number }
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const getComments = createAppAsyncThunk<CommentType[], { postId: number }, { state: RootState }>(
    "posts/getComments",
    async (arg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI

        try {
            const res = await postsApi.getComments(arg.postId)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const updatePost = createAppAsyncThunk<InitialPostType[], InitialPostType, { state: RootState }>(
    "posts/updatePost",
    async (arg, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        const posts = getState().posts.posts
        try {
            const post = { id: arg.id, title: arg.title, body: arg.body, userId: arg.userId }
            const res = await postsApi.updatePost(post)
            const updatedPosts = posts.map((p) => (p.id === res.data.id ? arg : p))
            return updatedPosts
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
export type InitialPostType = PostType & { favorite: boolean; checked: boolean; name: string; [key: string]: any }

type InitialStateType = {
    searchValue: string
    pageNumber: number
    pageSize: number
    posts: InitialPostType[]
    sortBy: {
        name: string
        sortType: null | number
    }
}
const initialState: InitialStateType = {
    searchValue: "",
    pageSize: 10,
    pageNumber: 0,
    posts: [],
    sortBy: {
        name: "",
        sortType: null,
    },
}
const slice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        sortPacks: (state, action: PayloadAction<{ name: string; sortType: number | null }>) => {
            state.sortBy = { ...action.payload }
        },
        removePosts: (state) => {
            state.posts = state.posts.filter((p) => p.checked !== true)
        },
        addPostsFavorites: (state) => {
            state.posts = state.posts.map((p) => (p.checked === true ? { ...p, favorite: true } : p))
        },

        setCheckedPost: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
            const post = action.payload
            state.posts = state.posts.map((p) => (p.id === post.id ? { ...p, checked: post.checked } : p))
        },

        addFavorite: (state, action: PayloadAction<InitialPostType>) => {
            const post = action.payload
            state.posts = state.posts.map((p) => (p.id === post.id ? { ...p, favorite: post.favorite } : p))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        builder.addCase(getComments.fulfilled, () => {})
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts.unshift(action.payload)
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const index = action.payload
            state.posts.splice(index, 1)
        })
    },
})

export const postsActions = slice.actions
export const postsReducer = slice.reducer
export const postsThunks = { getPosts, getPost, getComments, updatePost, deletePost, createPost }
