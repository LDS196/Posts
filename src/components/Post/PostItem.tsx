import React, { ChangeEvent, useState } from "react"
import s from "./postItem.module.scss"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentIcon from "@mui/icons-material/Comment"
import EditIcon from "@mui/icons-material/Edit"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"
import Comments from "../Comments/Comments"
import { CommentType } from "../../features/posts/posts.api"
import { useActions } from "../../hooks/useActions"
import { InitialPostType, postsActions, postsThunks } from "../../features/posts/posts.slice"
import { EditableBlock } from "../EditableSpan/EditableBlock"
import { Modal } from "../Modal/Modal"
import { Tooltip } from "@mui/material"

type Props = {
    post: InitialPostType
}
export const PostItem = ({ post }: Props) => {
    const { getComments } = useActions(postsThunks)
    const { deletePost } = useActions(postsThunks)
    const { addFavorite, setCheckedPost } = useActions(postsActions)

    const [showModalWindow, setShowModalWindow] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [comments, setComments] = useState<CommentType[]>([])
    const [isShowComments, setIsShowComments] = useState<boolean>(false)

    const buttonCommentClass = isShowComments ? "" : s.buttonComment

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedPost({ id: post.id, checked: event.target.checked })
    }

    const hideModal = () => setShowModalWindow(false)

    const deletePostHandler = () => {
        deletePost({ id: post.id })
            .unwrap()
            .then(() => hideModal())
    }
    const addFavoriteHandler = () => {
        addFavorite({ ...post, favorite: !post.favorite })
    }
    const activateViewMode = () => {
        setEditMode(false)
    }

    const onClickHandler = (e: any) => {
        setIsShowComments(!isShowComments)
        getComments({ postId: post.id }).then((res) => {
            if (Array.isArray(res.payload)) {
                setComments(res.payload)
            }
        })
    }
    const colorForIconFavorite = post.favorite ? "primary" : "inherit"

    return (
        <div className={s.postBlock}>
            <div className={s.container}>
                <EditableBlock post={post} activateViewMode={activateViewMode} editMode={editMode} />
                <div className={s.settings}>
                    <Tooltip arrow disableInteractive title={"Open comments"}>
                        <IconButton onClick={onClickHandler} className={buttonCommentClass}>
                            <CommentIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow disableInteractive title={"Edit post"}>
                        <IconButton
                            onClick={() => {
                                setEditMode(true)
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip arrow disableInteractive title={"Delete post"}>
                        <IconButton
                            onClick={() => {
                                setShowModalWindow(true)
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow disableInteractive title={"Add to favorites"}>
                        <IconButton onClick={addFavoriteHandler}>
                            <BookmarkAddedIcon color={colorForIconFavorite} />
                        </IconButton>
                    </Tooltip>

                    <FormControlLabel
                        control={<Checkbox checked={post.checked} onChange={handleChange} />}
                        label="Выбрать"
                    />
                </div>
            </div>
            {isShowComments && <Comments comments={comments} postId={post.id} />}
            {showModalWindow && (
                <Modal
                    buttonTitle={"Delete"}
                    callback={deletePostHandler}
                    subTitle={"remove post"}
                    title={"Delete Post"}
                    hideModal={hideModal}
                />
            )}
        </div>
    )
}
