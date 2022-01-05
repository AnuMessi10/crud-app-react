import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import WcIcon from '@mui/icons-material/Wc';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

type GenderMenuProps = {
    gender: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const genderList = [
    {
        id: 1,
        value: 'Male',
        icon: <MaleIcon />
    },
    {
        id: 2,
        value: 'Female',
        icon: <FemaleIcon />
    },
    {
        id: 3,
        value: 'Transgender',
        icon: <TransgenderIcon />
    }
]

export default function GenderMenu(props: GenderMenuProps) {
    return (
        <div className="form-gender">
            <WcIcon id="input-icon" sx={{ fontSize: 35 }} />
            <TextField id="outlined-select-gender" name="gender" select label="Choose your gender" variant="filled" required fullWidth value = {props.gender} onChange={props.handleChange}>
                {genderList.map((listItem) => {
                    return (
                        <MenuItem key={listItem.id} value = {listItem.value}>
                            {listItem.icon} {listItem.value}
                        </MenuItem>
                    )
                })};
            </TextField>
        </div>
    )
}
