import { instance } from "../../common/api/common.api"

export const usersApi = {
    getUsers() {
        return instance.get<UserType[]>(`/users`)
    },
}

export type UserType = {
    name: string
    id: number
}
