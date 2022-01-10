import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../actions/actionTypes";

const initialState = {
    listItems: [
        {
            id: Math.floor(Math.random() * 10000),
            name: "Lebron James",
            age: 10,
            gender: "Male"
        }
    ]
}

const listReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                listItems: [...state.listItems, action.payload]
            }
    
        case DELETE_ITEM:
            const filteredListItems = state.listItems.filter(listItem => listItem.id !== action.payload)            
            return {
                ...state,
                listItems: filteredListItems
            }

        case UPDATE_ITEM:
            console.log(action.payload);
            const newListItems = state.listItems.map(listItem => listItem.id === action.payload.id ? action.payload : listItem);
            return {
                ...state,
                listItems: newListItems
            }

        default:
            return state;
    }
}

export default listReducer;