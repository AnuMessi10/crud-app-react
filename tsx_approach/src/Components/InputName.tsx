import React from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import { TextField } from '@mui/material';

type InputNameProps = {
    name: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputName(props: InputNameProps) {
    return (
        <div className="form-name">
            <AbcIcon id="input-icon" sx={{ fontSize: 40 }} />
            <TextField id="filled-basic-name" name="name" label="Enter your name" variant="filled" required fullWidth placeholder="Joseph Menezes" value={props.name} onChange={props.handleChange} />
        </div>
    )
}
