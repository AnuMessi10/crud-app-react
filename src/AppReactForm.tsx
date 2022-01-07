import { ReactForm } from 'react-forms'
import React, { useState } from 'react'
import CardItem from './Components/CardItem'
import './App.css'

interface parameters {
    id: number,
    name: string,
    age: "" | number,
    gender: string
}

export default function AppReactForm() {

    const [cardItems, setCardItems] = useState<parameters[]>([]);

    const [formField, setFormField] = useState<parameters>({
        id: -1,
        name: "",
        age: "",
        gender: ""
    });

    // set a random ID and add item to list
    const addElement = (event: parameters) => {
        event.id = Math.floor(Math.random() * 10000);
        setFormField(event);
        setCardItems(() => { return [...cardItems, event] });
    }

    // update element based on id
    const updateElement = (event: parameters) => {
        setCardItems(cardItems.map(cardItem => cardItem.id === event.id ? event : cardItem));
        setButtonText("Add");
    }

    // get card details based on ID
    const addIt = (ID: number) => {
        const addItElement = cardItems.find(cardItem => cardItem.id === ID);
        addItElement !== undefined ? setFormField(addItElement) : console.log("Error, card not found");
        setButtonText("Update");
    }

    // delete an element using the id
    const deleteElement = (ID: number) => {
        setCardItems(cardItems.filter(cardItem => cardItem.id !== ID))
    }

    // check for button text
    const handleSubmit = (event: parameters) => {
        buttonText === "Add" ? addElement(event) : updateElement(event)
    }

    const textFieldNameProps = {
        label: "Enter your fullname...",
        required: true,
        placeholder: "James Bond",
        variant: "filled",
    }

    const textFieldAgeProps = {
        label: "Enter your age...",
        required: true,
        placeholder: '',
        variant: "filled",
    }

    const selectGenderProps = {
        label: "Choose your gender...",
        options: [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }, { name: 'Transgender', value: 'Transgender' }],
        required: true,
        variant: 'filled',
        autowidth: true,
    }

    const defaultStyleProps = { display: 'flex', margin: '0 auto', justifyContent: 'center' };

    const myConfig = [{
        type: 'text',
        valueKey: 'name',
        fieldProps: { ...textFieldNameProps },
        styles: defaultStyleProps,
    },
    {
        type: 'text',
        valueKey: 'age',
        fieldProps: { ...textFieldAgeProps },
        styles: defaultStyleProps,
    },
    {
        type: 'select',
        valueKey: 'gender',
        fieldProps: { ...selectGenderProps },
        styles: defaultStyleProps,
    }
    ]

    const [buttonText, setButtonText] = useState("Add");

    const submitButtonProps = { color: "primary" as const, fullwidth: "true", disabled: false }

    const actionConfig = {
        submitButtonText: buttonText,
        submitButtonProps: submitButtonProps,
    }

    return (
        <div className='App'>
            <div className="card">
                {
                    cardItems.map((cardItem) => {
                        return (
                            <CardItem key={cardItem.id} cardItem={cardItem} addIt={addIt} deleteElement={deleteElement} />
                        )
                    })
                }
            </div>
            <div className='form'>
                <ReactForm
                    formId='react-form-crud'
                    config={myConfig}
                    initialValues={formField}
                    onSubmit={handleSubmit}
                    actionConfig={actionConfig}
                    enableReinitialize
                />
            </div>
        </div>
    )
}
