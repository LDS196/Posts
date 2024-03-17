import { RootState } from "../../app/store"

export const selectUsers = (state: RootState) => state.users.users
export const selectFilterUserNames = (state: RootState) => state.users.filterUserNames
