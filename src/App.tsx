import React from "react"
import { useState } from "react"
import { Button } from "@mui/material"
import GenderMenu from "./Components/GenderMenu"
import InputName from "./Components/InputName"
import InputAge from "./Components/InputAge"
import CardItem from "./Components/CardItem"
import './App.css'

interface parameters {
    id: number,
    name: string,
    age: number,
    gender: string
}

export default function App() {

    const [cardItems, setCardItems] = useState<parameters[]>([]);

    const [formField, setFormField] = useState<parameters>({
        id: 0,
        name: "",
        age: 0,
        gender: ""
    })

    const [buttonText, setButtonText] = useState("Add");

    const pushElement = () => {
        // create ID for the new item to be added
        setFormField(() => {return {...formField, id: Math.floor(Math.random() * 1000)}})

        // add the item to the list
        setCardItems([...cardItems, formField]);
    }

    // sets value of form as the clicked item
    const addIt = (ID: number) => {
        
        const element = cardItems.find(cardItem => cardItem.id === ID);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element !== undefined ? setFormField(element) : null;
        setButtonText("Update");
    }

    // update an element using id
    const updateElement = () => {
        setCardItems(cardItems.map(cardItem => cardItem.id === formField.id ? formField : cardItem));
        setButtonText("Add");
    }

    // delete an element using the id
    const deleteElement = (ID: number) => {
        setCardItems(cardItems.filter(cardItem => cardItem.id !== ID))
    }

    // handle form input fields using a single state
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormField(() => {
            return { ...formField, [event.target.name]: event.target.value }
        })
    }

    // on form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        buttonText === "Add" ? pushElement() : updateElement()
    }

    return (
        <div className="App">
            <div className="card">
                {
                    cardItems.map((cardItem) => {
                        return (
                            <CardItem key={cardItem.id} cardItem={cardItem} addIt={addIt} deleteElement={deleteElement} />
                        )
                    })
                }
            </div>
            <form className='form' onSubmit={handleSubmit}>
                <InputName name={formField.name} handleChange={handleChange} />
                <InputAge age={formField.age === 0 ? "" : formField.age} handleChange={handleChange} />
                <GenderMenu gender={formField.gender} handleChange={handleChange} />
                <div className="form-btn">
                    <Button variant="outlined" type="submit">{buttonText}</Button>
                </div>
            </form>
        </div>
    )
}