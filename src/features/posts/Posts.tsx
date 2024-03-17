import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { postsActions, postsThunks } from "./posts.slice"
import { useSelector } from "react-redux"
import { PostItem } from "../../components/Post/PostItem"
import { selectPageNumber, selectPageSize, selectPosts, selectSearchValue, selectSortBy } from "./posts.selector"
import s from "./posts.module.scss"
import { Button, Pagination } from "@mui/material"
import { Modal } from "../../components/Modal/Modal"
import Filter from "../../components/Filter/Filter"
import Box from "@mui/material/Box"
import { usersThunks } from "../users/users.slice"
import { selectFilterUserNames } from "../users/users.selector"

export const Posts = () => {
    const { removePosts, addPostsFavorites, setPageNumber } = useActions(postsActions)
    const { getPosts } = useActions(postsThunks)
    const { getUsers } = useActions(usersThunks)

    const searchValue = useSelector(selectSearchValue)
    const pageSize = useSelector(selectPageSize)
    const pageNumber = useSelector(selectPageNumber)
    const filterUserNames = useSelector(selectFilterUserNames)
    const posts = useSelector(selectPosts)
    const sortBy = useSelector(selectSortBy)

    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalFavorites, setShowModalFavorites] = useState(false)


    let postsForRender = posts.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
    postsForRender = postsForRender.filter((p) => p.title.includes(searchValue))

    if (filterUserNames.length !== 0) {
        postsForRender = postsForRender.filter((p) => filterUserNames.includes(p.name))
    }

    if (sortBy.name && sortBy.sortType) {
        const key = sortBy.name
        const sortDirection = sortBy.sortType
        postsForRender.sort((a, b) => {
            if (key === "userId") return (a[key] - b[key]) * sortDirection
            if (key === "favorites") return -sortDirection
            if (a[key].toLowerCase() < b[key].toLowerCase()) return sortDirection
            if (a[key].toLowerCase() > b[key].toLowerCase()) return sortDirection
            return 0
        })
    }

    const postChecked = postsForRender.find((p) => p.checked)
    const countPages = Math.ceil(posts.length / pageSize)

    useEffect(() => {
        getUsers({}).then(() => getPosts({}))
    }, [])

    const hideModalDelete = () => setShowModalDelete(false)
    const hideModalFavorites = () => setShowModalFavorites(false)

    const addPostsFavoritesHandler = () => {
        addPostsFavorites()
        hideModalFavorites()
    }

    const removePostsHandler = () => {
        removePosts()
        hideModalDelete()
    }
    const changePageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        setPageNumber(page - 1)
    }

    return (
        <>
            <Filter />
            <div className={s.checked}>
                {postChecked && (
                    <>
                        <Button onClick={() => setShowModalDelete(true)} variant={"contained"}>
                            Удалить
                        </Button>
                        <Button onClick={() => setShowModalFavorites(true)} variant={"outlined"}>
                            В избранное
                        </Button>
                    </>
                )}
            </div>
            <div>
                {postsForRender.map((p) => (
                    <PostItem key={p.id} post={p} />
                ))}
            </div>
            {!!postsForRender.length && (
                <Box display="flex" justifyContent="end" py={4}>
                    <Pagination count={countPages} page={pageNumber + 1} onChange={changePageHandler} />
                </Box>
            )}
            <>
                {showModalDelete && (
                    <Modal
                        buttonTitle={"Delete"}
                        callback={removePostsHandler}
                        subTitle={"remove posts"}
                        title={"Delete Posts"}
                        hideModal={hideModalDelete}
                    />
                )}
                {showModalFavorites && (
                    <Modal
                        buttonTitle={"Add"}
                        callback={addPostsFavoritesHandler}
                        subTitle={"add posts to favorites"}
                        title={"Add Posts"}
                        hideModal={hideModalFavorites}
                    />
                )}
            </>
        </>
    )
}
