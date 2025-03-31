import {createSlice} from "@reduxjs/toolkit";


interface Userprops{
    id:string;
    email:string;
};

interface Productprops{
    id:number;
    title:string;
    image:string;
    category:string;
    description:string;
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
        purchaseItem:(state,action)=>{
            const newItem = action.payload;
            const itemExists = state.cart.find((item)=> item.id === newItem.id);
            if(itemExists){
                itemExists.quantity++;
                itemExists.totalPrice += newItem.price;
            }
            else{
                state.cart.push({
                    id:newItem.id,
                    title:newItem.title,
                    image:newItem.image,
                    category:newItem.category,
                    description:newItem.description,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                });
                // state.cart.push({
                //     ...newItem,
                //     quantity:1,
                //     totalPrice:newItem.price
                // })
            }
        },
        increaseQuantity:(state,action)=>{
            const itemId = action.payload;
            const itemExists = state.cart.find((item)=> item.id === itemId);
            if(itemExists){
                if(itemExists.quantity > 1 || itemExists.quantity === 1){
                    itemExists.quantity++;
                    itemExists.totalPrice += itemExists.price;
                }
            }
        },
        decreaseQuantity:(state,action)=>{
            // Action here is for the item id that the user want to decrease quantity for it
            const itemId= action.payload;
            // Check here if the item already exists in the cart or not by comparing the item id with the id of the item the user chosen to decrease it's quantity
            const itemExists = state.cart.find((item)=> item.id === itemId);
            // Check if the item exists in the cart or not
            if(itemExists){
                // If the item in the cart has quantity larger than 1 then decrease that quantity by one and decrease the price of that item from the total price of the whole cart as it's removed from the cart.
                if(itemExists.quantity > 1){
                    itemExists.quantity--;
                    itemExists.totalPrice -= itemExists.price;
                }
                // If the item that the user has chosen to decrease is already one quantity and the user still wants to decrease it then the item quantity becomes 0 and that means the item well be deleted from the cart.
                else{
                    // Here the condition for the cart that checks the item the user wants to decrease if the item id is equal to the id of the item the user wants to decrease, if it matches the condition then it deletes the whole product with all it's quantities.
                    state.cart = state.cart.filter((item)=> item.id !== itemId);
                }
            }
        },
        deleteItem:(state,action)=>{
            const targetedItem = action.payload;
            // Here check if the item.id is equal to the id of the item the user wants to delete, if it matches then the item is deleted from the cart.
            state.cart = state.cart.filter((item)=> item.id !== targetedItem);
            console.log(targetedItem);
        },
        clearCart:(state)=>{
            // Here clears the cart array by initializing the array with an empty array.
            state.cart = []
        }
    }
});


export const { setUser, purchaseItem, increaseQuantity, decreaseQuantity, deleteItem, clearCart } = globalState.actions;
export default globalState.reducer;
