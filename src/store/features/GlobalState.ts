import {createSlice} from "@reduxjs/toolkit";


interface Userprops{
    id:string;
    name:string;
};

interface Productprops{
    id:number;
    name:string;
    price:number;
};

interface GlobalState{
    user: Userprops | null;
    cart: Productprops[];
};

const initialState: GlobalState = {
    user: null,
    cart:[],
};

export const globalState = createSlice({
    name:"global",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        addItem:(state,action)=>{
            const newItem = action.payload;
            state.cart.push({
                id:newItem.id,
                title:newItem.title,
                price:newItem.price,
                description:newItem.description,
                category:newItem.category,
            });
        }
    }
});


export const { setUser, addItem } = globalState.actions;
export default globalState.reducer;
