import { Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add"

type ListItemProps = {
    listItem: {
        id: number,
        name: string,
        age: "" | number,
        gender: string
    }
    addIt: (id: number) => void,
    deleteElement: (id: number) => void
};

const ListItem = (props: ListItemProps) => {

    return (
        <div className="card-item">
            <Paper elevation={8} id="card-element">
                <div className="card-details">
                    <p><strong>Name: </strong>{props.listItem.name}</p>
                    <p><strong>Age: </strong>{props.listItem.age}</p>
                    <p><strong>Gender: </strong>{props.listItem.gender}</p>
                </div>
                <div className="card-btns">
                    <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={() => { props.addIt(props.listItem.id) }} >Add It</Button>
                    <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={() => { props.deleteElement(props.listItem.id) }} >Delete</Button>
                </div>
            </Paper>
        </div>
    );
};

export default ListItem;