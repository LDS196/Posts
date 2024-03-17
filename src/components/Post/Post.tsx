import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { postsThunks } from "../../features/posts/posts.slice"
import { PostType } from "../../features/posts/posts.api"
import { Link } from "@mui/material"

const Post: React.FC = () => {
    const { getPost } = useActions(postsThunks)
    const [post, setPost] = useState<PostType | null>(null)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (!id) return

        getPost({ id: +id }).then((res) => {
            if (res.payload?.hasOwnProperty("id")) {
                setPost(res.payload as PostType)
            }
        })
    }, [id])

    return (
        <>
            {post && (
                <div>
                    <p>
                        <b>Title:</b> {post.id}
                    </p>
                    <p>
                        <b>Name:</b> {post.title}
                    </p>
                    <p>
                        <b>Description:</b> {post.body}
                    </p>
                    <Link href={`/`}>to main</Link>
                </div>
            )}
        </>
    )
}
export default Post
