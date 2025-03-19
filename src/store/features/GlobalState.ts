import {createSlice} from "@reduxjs/toolkit";


interface Userprops{
    id:string;
    name:string;
};

interface Productprops{
    id:number;
    name:string;
    price:number;
    quantity:number;
    totalPrice:number;
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
            const itemExists = state.cart.find((item)=> item.id === newItem.id);
            if(itemExists){
                itemExists.quantity++;
                itemExists.totalPrice += newItem.price;
            }
            else{
                state.cart.push({
                    id:newItem.id,
                    name:newItem.name,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                });
            }
        }
        
    }
});


export const { setUser, addItem } = globalState.actions;
export default globalState.reducer;
