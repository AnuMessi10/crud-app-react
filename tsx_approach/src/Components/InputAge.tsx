import React from 'react';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import { TextField } from '@mui/material';

type InputAgeProps = {
    age: "" | number,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputAge(props: InputAgeProps) {

    const validAge = {
        min: 1,
        max: 100
      };

    return (
        <div className="form-age">
            <EscalatorWarningIcon id="input-icon" sx={{ fontSize: 35 }} />
            <TextField id="filled-basic-age" name="age" label="Enter your age" type="number" variant="filled" required fullWidth placeholder="15" inputProps={validAge} value={props.age} onChange={props.handleChange} />
        </div>
    )
}
