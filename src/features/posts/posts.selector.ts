import { RootState } from "../../app/store"

export const selectPosts = (state: RootState) => state.posts.posts
export const selectSearchValue = (state: RootState) => state.posts.searchValue
export const selectPageSize = (state: RootState) => state.posts.pageSize
export const selectPageNumber = (state: RootState) => state.posts.pageNumber
export const selectSortBy = (state: RootState) => state.posts.sortBy
