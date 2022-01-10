import * as YUP from 'yup';
import { useState } from 'react';
import { ReactForm, setDefaultProps } from 'react-forms';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import ListItem from './Components/ListItem'
import { addItem, deleteItem, updateItem } from './redux/actions/actions';

interface Parameters {
  id: number,
  name: string,
  age: "" | number,
  gender: string
}

function App() {

  const [formField, setFormField] = useState<Parameters>({
    id: -1,
    name: "",
    age: "",
    gender: ""
  });

  // fetch the list of cards from redux
  const listItems = useSelector((state: any) => state.listItems);

  // dispatcher for sending action to store
  const dispatch = useDispatch();

  // push a new item into the list
  const addElement = (event: Parameters) => {
    event.id = Math.floor(Math.random() * 10000);
    dispatch(addItem(event));
  }

  // set form fields based on ID of clicked element
  const addIt = (ID: number) => {
    const addItElement = listItems.find((listItem: Parameters) => listItem.id === ID);
    addItElement !== undefined ? setFormField(addItElement) : console.log("Error, card not found");
    setButtonText("Update");
  }

  // update the clicked item
  const updateElement = (event: Parameters) => {
    dispatch(updateItem(event));
  }

  // delete the clicked item based on ID
  const deleteElement = (ID: number) => {
    dispatch(deleteItem(ID));
  }

  // handle submit and decide operation to be performed
  const handleSubmit = (event: Parameters) => {
    buttonText === "Add" ? addElement(event) : updateElement(event);
  }

  setDefaultProps('text', { required: true, variant: "filled" });
  setDefaultProps('select', { required: true, variant: "filled", autowidth: "true" })

  const textFieldNameProps = {
    label: "Enter your fullname...",
    placeholder: "James Bond",
  }

  const textFieldAgeProps = {
    label: "Enter your age...",
    placeholder: '',
  }

  const selectGenderProps = {
    label: "Choose your gender...",
    options: [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }, { name: 'Transgender', value: 'Transgender' }],
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

  const formValidation = YUP.object({
    name: YUP.string().required("Enter a valid name!"),
    age: YUP.number().min(1).max(130).required("Enter a valid age!"),
    gender: YUP.string().required("Select a gender!")
  })

  const [buttonText, setButtonText] = useState("Add");

  const submitButtonProps = { color: "primary" as const, fullwidth: "true", disabled: false }

  const loaderProps = { variant: "determinate" as const, }

  const actionConfig = {
    submitButtonText: buttonText,
    submitButtonProps: submitButtonProps,
    loaderProps: loaderProps,
  }

  return (
    <div className="App">
      <div className="card">
        {
          listItems.map((listItem: Parameters) => {
            return (
              <ListItem key={listItem.id} listItem={listItem} addIt={addIt} deleteElement={deleteElement} />
            )
          })
        }
      </div>
      <div className='form'>
        <ReactForm
          formId='react-form-crud'
          config={myConfig}
          initialValues={formField}
          validationSchema={formValidation}
          onSubmit={handleSubmit}
          actionConfig={actionConfig}
          enableReinitialize
        />
      </div>
    </div>
  );
}

export default App;