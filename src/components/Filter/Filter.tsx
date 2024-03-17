import React, { useState } from "react"
import { Search } from "./Search/Search"
import MultipleSelectCheckmarks from "./MultiSelect/MultipleSelect"
import { BasicTable } from "./Sort/BasicTable"
import s from "./filter.module.scss"
import { Button } from "@mui/material"
import NewPostForm from "../NewPost/NewPostForm"
import SelectPageSize from "./SelectPageSize/SelectPageSize"

const Filter = () => {
    const [showModalWindow, setShowModalWindow] = useState(false)
    const hideModal = () => setShowModalWindow(false)

    return (
        <div className={s.filter}>
            <BasicTable />
            <Search />
            <MultipleSelectCheckmarks />
            <SelectPageSize />
            <Button variant={"contained"} onClick={() => setShowModalWindow(true)}>
                Add new post
            </Button>
            {showModalWindow && <NewPostForm hideModal={hideModal} />}
        </div>
    )
}

export default Filter
