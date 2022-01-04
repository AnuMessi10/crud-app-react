import './App.css';
import { React, useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material'
import AbcIcon from '@mui/icons-material/Abc';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import WcIcon from '@mui/icons-material/Wc';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import ListItem from './Components/ListItem';

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

export default function App() {

    //LHS list using array in a state
    const [listItems, setListItems] = useState([]);

    //to control the value of the button
    const [buttonText, setButtonText] = useState("Add");

    //to handle the changes of the form values
    const [formField, setFormField] = useState({
        id: "",
        name: "",
        age: "",
        gender: ""
    })

    //on submission of form
    const pushElement = (event) => {
        event.preventDefault();

        //Check if operation to be performed is add or update
        (buttonText === "Add") ? addElement() : updateExistingElement();
    }

    const addElement = () => {

        //creating new object to be added in the list
        const newElement = {
            id: Math.floor(Math.random() * 1000),
            name: formField.name,
            age: formField.age,
            gender: formField.gender
        }

        //adding the object to the list
        setListItems(prevListItems => [...prevListItems, newElement]);
    }

    const updateExistingElement = () => {

        //creating object for element to be updated
        const updatedElement = {
            id: formField.id,
            name: formField.name,
            age: formField.age,
            gender: formField.gender
        }

        //updating the element using id as a unique key
        setListItems(listItems.map(listItem => listItem.id === formField.id ? updatedElement : listItem));

        //Changing value of button
        setButtonText("Add");
    }

    //delete element using id as key
    const deleteElement = (ID) => {
        setListItems(listItems.filter(listItem => listItem.id !== ID))
    }

    //set value of form same as value of clicked item
    const getElement = (ID) => {

        //retrieving the values of the clicked element
        const elementToBeUpdated = listItems.filter(listItem => listItem.id === ID);

        //updating the input fields of the form
        setFormField(prevValue => {
            return { ...prevValue, id: elementToBeUpdated[0].id, name: elementToBeUpdated[0].name, age: elementToBeUpdated[0].age, gender: elementToBeUpdated[0].gender };
        });

        //changing text of button to update
        setButtonText("Update");
    }

    //handling values of all 3 input fields using a single state
    const handleChange = (event) => {
        setFormField(prevValue => {
            return { ...prevValue, [event.target.name]: event.target.value }
        })
    }

    return (
        <div className="App">
            <div className="list">
                {
                    listItems.map((item) => {
                        return (
                            <ListItem key={item.id} id={item.id} name={item.name} age={item.age} gender={item.gender} deleteElement={deleteElement} getElement={getElement} />
                        )
                    })
                }
            </div>
            <form className='form' onSubmit={pushElement}>
                <div className="form-name">
                    <AbcIcon id="input-icon" sx={{ fontSize: 40 }} />
                    <TextField id="filled-basic-name" name="name" label="Enter your name" variant="filled" required fullWidth placeholder="Joseph Menezes" value={formField.name} onChange={handleChange} />
                </div>
                <div className="form-age">
                    <EscalatorWarningIcon id="input-icon" sx={{ fontSize: 35 }} />
                    <TextField id="filled-basic-age" name="age" label="Enter your age" type="number" variant="filled" required fullWidth placeholder="15" value={formField.age} onChange={handleChange} />
                </div>
                <div className="form-gender">
                    <WcIcon id="input-icon" sx={{ fontSize: 35 }} />
                    <TextField id="outlined-select-gender" name="gender" select label="Choose your gender" variant="filled" required fullWidth value={formField.gender} onChange={handleChange}>
                        {genderList.map((gender) => (
                            <MenuItem key={gender.id} value={gender.value}>
                                {gender.icon} {gender.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="form-btn">
                    <Button variant="outlined" type="submit">{buttonText}</Button>
                </div>
            </form>
        </div>
    )
}
