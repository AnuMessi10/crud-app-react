import './App.css';
import { useState } from 'react';
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

function App() {

  const [listItems, setListItems] = useState([]);

  const [buttonText, setButtonText] = useState({
    display: 'Add',
    keyValue: -1
  });

  const deleteElement = (event) => {
    event.preventDefault();
    const ID = event.target.value;
    setListItems(listItems.filter(listItem => listItem.id !== parseInt(ID)));
  }

  const pushElement = (event) => {
    event.preventDefault();

    if (buttonText.display === 'Add') {
      var lastIndex;

      try {
        lastIndex = listItems.at(-1).id;
      } catch (error) {
        lastIndex = 0;
      }

      const newElement = {
        id: lastIndex + 1,
        name: event.target[0].value,
        age: event.target[1].value,
        gender: event.target[2].value
      }

      setListItems(prevListItems =>
        [...prevListItems, newElement]
      )
    }
    else {
      listItems[buttonText.keyValue - 1] = {
        id: buttonText.keyValue,
        name: event.target[0].value,
        age: event.target[1].value,
        gender: event.target[2].value
      };
      setButtonText(() => {
        return { display: 'Add', keyValue: -1 }
      })
    }
  }

  const [genderValue, setGenderValue] = useState({
    title: "",
  });

  const updateElement = (event) => {

    const updateItem = listItems.filter(listItem => listItem.id === parseInt(event.target.value));

    document.getElementById("filled-basic-name").value = updateItem[0].name;
    document.getElementById("filled-basic-age").value = updateItem[0].age;

    setGenderValue(() => { return { title: updateItem[0].gender } });

    setButtonText(() => {
      return { display: 'Update', keyValue: updateItem[0].id }
    })
  }

  return (
    <div className="App">
      <div className="list">
        {
          listItems.map((item) => {
            return (
              <ListItem key={item.id} id={item.id} name={item.name} age={item.age} gender={item.gender} deleteElement={deleteElement} updateElement={updateElement} />
            )
          })
        }
      </div>
      <form className='form' onSubmit={pushElement}>
        <div className="form-name">
          <AbcIcon id="input-icon" sx={{ fontSize: 40 }} />
          <TextField
            id="filled-basic-name"
            label="Enter your name"
            variant="filled"
            required
            fullWidth
            placeholder="Joseph Menezes" />
        </div>
        <div className="form-age">
          <EscalatorWarningIcon id="input-icon" sx={{ fontSize: 35 }} />
          <TextField
            id="filled-basic-age"
            label="Enter your age"
            type="number"
            variant="filled"
            required
            fullWidth
            placeholder="15" />
        </div>
        <div className="form-gender">
          <WcIcon id="input-icon" sx={{ fontSize: 35 }} />
          <TextField
            id="outlined-select-gender"
            select
            label="Choose your gender"
            variant="filled"
            required
            fullWidth
            value={genderValue.title}
            onChange={(event) => setGenderValue(() => { return { title: event.target.value } })}>
            {genderList.map((gender) => (
              <MenuItem key={gender.id} value={gender.value}>
                {gender.icon} {gender.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="form-btn">
          <Button variant="outlined" type="submit" value={buttonText.keyValue}>{buttonText.display}</Button>
        </div>
      </form>
    </div>
  );
}

export default App;