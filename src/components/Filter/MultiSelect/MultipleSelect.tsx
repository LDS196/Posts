import * as React from "react"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import { useSelector } from "react-redux"
import { useActions } from "../../../hooks/useActions"
import { usersActions } from "../../../features/users/users.slice"
import { selectPosts } from "../../../features/posts/posts.selector"
import { selectFilterUserNames } from "../../../features/users/users.selector"

const MenuProps = {
    PaperProps: {
        style: {
            minWidth: 250,
        },
    },
}

const MultipleSelect = () => {
    const posts = useSelector(selectPosts)
    const filterUserNames = useSelector(selectFilterUserNames)
    const { setFilterUserNames } = useActions(usersActions)

    let names: string[] = []
    posts.forEach((p) => {
        if (!names.includes(p.name)) names.push(p.name)
    })

    const handleChange = (event: SelectChangeEvent<typeof filterUserNames>) => {
        const {
            target: { value },
        } = event
        setFilterUserNames(typeof value === "string" ? value.split(",") : value)
    }

    return (
        <div>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">User name</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={filterUserNames}
                    onChange={handleChange}
                    input={<OutlinedInput label="User name" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={filterUserNames.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default MultipleSelect
