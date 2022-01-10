import React from 'react';
import { Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type CardItemProps = {
    cardItem: {
        id: number,
        name: string,
        age: string | number,
        gender: string
    },
    addIt: (id: number) => void,
    deleteElement: (id: number) => void
}

export default function CardItem(props: CardItemProps) {
    return (
        <div className='card-item'>
            <Paper elevation={8} id="card-element">
                <div className="card-details">
                    <p><strong>ID: </strong>{props.cardItem.id}</p>
                    <p><strong>Name: </strong>{props.cardItem.name}</p>
                    <p><strong>Age: </strong>{props.cardItem.age}</p>
                    <p><strong>Gender: </strong>{props.cardItem.gender}</p>
                </div>
                <div className="card-btns">
                    <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={() => { props.addIt(props.cardItem.id) }} >Add It</Button>
                    <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => { props.deleteElement(props.cardItem.id) }} >Delete</Button>
                </div>
            </Paper>
        </div>
    )
}
