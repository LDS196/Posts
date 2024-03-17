import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useSelector } from "react-redux"
import { selectPageSize } from "../../../features/posts/posts.selector"
import { useActions } from "../../../hooks/useActions"
import { postsActions } from "../../../features/posts/posts.slice"

const SelectPageSize = () => {
    const pageSize = useSelector(selectPageSize)
    const { setPageSize, setPageNumber } = useActions(postsActions)

    const handleChange = (event: SelectChangeEvent) => {
        setPageNumber(0)
        setPageSize(Number(event.target.value))
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Count Posts</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageSize.toString()}
                    label="Count Posts"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>All</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default SelectPageSize
