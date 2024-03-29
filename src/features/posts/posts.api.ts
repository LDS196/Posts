import { instance } from "../../common/api/common.api"

export const postsApi = {
    getPosts() {
        return instance.get<PostType[]>(`/posts`)
    },
    getPost(id: number) {
        return instance.get<PostType>(`/posts/${id}`)
    },
    getComments(postId: number) {
        return instance.get<CommentType[]>(`/posts/${postId}/comments`)
    },
    updatePost(post: PostType) {
        return instance.put<PostType>(`/posts/${post.id}`, post)
    },
    createPost(post: Omit<PostType, "id">) {
        return instance.post<PostType>(`/posts`, post)
    },
    deletePost(id: number) {
        return instance.delete<void>(`/posts/${id}`)
    },
}

export type PostType = {
    userId: number
    id: number
    title: string
    body: string
}

export type CommentType = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}
