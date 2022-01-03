import React from 'react'
import { Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListItem(props) {
    return (
        <div className='list-item'>
            <Paper elevation={8} id="list-element">
                <div className="list-details">
                    <p><strong>Name: </strong>{props.name}</p>
                    <p><strong>Age: </strong>{props.age}</p>
                    <p><strong>Gender: </strong>{props.gender}</p>
                </div>
                <div className="list-btns">
                    <Button color="success" variant="contained" startIcon={<AddIcon />} value={props.id} onClick={props.updateElement}>Add It</Button>
                    <Button color="error" variant="contained" startIcon={<DeleteIcon />} value={props.id} onClick={props.deleteElement}>Delete</Button>
                </div>
            </Paper>
        </div>
    )
}
