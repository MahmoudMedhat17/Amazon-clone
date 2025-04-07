import {createSlice} from "@reduxjs/toolkit";
// import {db} from "../../../firebase";
// import {collection, doc, setDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";



// Show the products related to the user when the user is logged in
// export const fetchCartThunk = createAsyncThunk("cart/fetchcart", async(userId)=>{
//    try {
//     const cartItems = collection(db,`user/${userId}/id`);
//     const allItems = await getDocs(cartItems);
//     return allItems.docs.map((doc)=> (
//         {
//             id:Number(doc.id),
//             title:doc.data().title as string,
//             image:doc.data().image as string | null,
//             category:doc.data().category as string,
//             description:doc.data().description as string,
//             price:doc.data().price as number,
//             quantity:doc.data().quantity as number,
//             totalPrice:doc.data().totalPrice as number
//         }));
//    } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong!");
//    }
// });


// Add products to the cart and save them to firestore database
// export const purchaseItemThunk = createAsyncThunk("cart/purchaseItemThunk", async({userId, product}, {getState})=>{
//     try {
//         const state = getState();
//         const productItems = doc(db, `users/${userId}/cart`, product.id.toString());
//         const itemExists = state.cart.find((item)=> item.id === product.id);
        
//         if(itemExists){
//             await updateDoc(productItems,{
//                 quantity: itemExists.quantity + 1,
//                 totalPrice: itemExists.totalPrice += product.price
//             });
//         }
//         else{
//             await setDoc(productItems,{
//                 ...product,
//                 quantity:1,
//                 totalPrice: product.price
//             })
//         };

//         return product;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Something went wrong!");
//     }
// });


// Increase the number of the same product in the cart and save it to firebase firestore
// export const increaseQuantityThunk = createAsyncThunk("cart/increaseQuantityThunk", async({userId, productId}, {getState})=>{
//     try {
//         const state = getState();
//         const productItems = doc(db, `users/${userId}/cart`, productId.toString());
//         const itemExists = state.cart.find((item)=> item.id === productId);

//         if(!itemExists) return;

//         await updateDoc(productItems,{
//             quantity: itemExists.quantity + 1,
//             totalPrice: itemExists.totalPrice + itemExists.price
//         })

//         return productId;   
//     } catch (error) {
//         console.log(error);
//         throw new Error("Something went wrong!");
//     }
// });


// Decrease the number of the same product in the cart and save it to firebase firestore
// export const decreaseQuantityThunk = createAsyncThunk("cart/decreaseQuantityThunk", async({userId, productId}, {getState})=>{
//     try {
//         const state = getState();
//         const productItems = doc(db, `users/${userId}/cart`, productId.toString());
//         const itemExists = state.cart.find((item)=> item.id === productId);

//         if(!itemExists) return;
        
//         if(itemExists.quantity > 1){
//             await updateDoc(productItems,{
//                 quantity:itemExists.quantity - 1,
//                 totalPrice: itemExists.totalPrice - itemExists.price
//             })
//         }
//         else{
//             await deleteDoc(productItems);
//         }

//         return productId;   
//     } catch (error) {
//         console.log(error);
//         throw new Error("Something went wrong!");
//     }
// });


// Remove item from the cart and delete it from firebase firestore
// export const deleteItemThunk = createAsyncThunk("cart/deleteItemThunk", async({userId,productId})=>{
//     try {
//         const productItems = doc(db, `users/${userId}/cart`, productId.toString());
//         await deleteDoc(productItems);
//         return productId;   
//     } catch (error) {
//         console.log(error);
//         throw new Error("Something went wrong!");
//     }
// });


// Clear the entire cart
// export const clearCartThunk = createAsyncThunk("cart/clearCartThunk", async(userId)=>{
//     try {
//         const itemsInCart = collection(db, `users/${userId}/cart`);
//         const allItems = await getDocs(itemsInCart);
//         for(const items of allItems.docs){
//             await deleteDoc(items.ref);
//         }
//         return [];
//     } catch (error) {
//         console.log(error);
//         throw new Error("Something went wrong!");
//     }
// });


interface Userprops{
    id:string;
    email:string;
};

interface Productprops{
    id:number;
    title:string;
    image:string | undefined;
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
            // Action here is for the item id that the user want to decrease quantity for it
            const itemId = action.payload;
            // Check here if the item already exists in the cart or not by comparing the item id with the id of the item the user chosen to decrease it's quantity
            const itemExists = state.cart.find((item)=> item.id === itemId);
            // Check if the item exists in the cart or not
            if(itemExists){
                // If the item in the cart has quantity larger than 1 or item in the cart quantity = 1 then increase that quantity by one and increase the price of that item from the total price of the whole cart as it's added to the cart.
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
    },
    // extraReducers(builder) {
    //     builder.addCase(fetchCartThunk.fulfilled,(state,action)=>{
    //         state.cart = action.payload
    //     })
    //     builder.addCase(purchaseItemThunk.fulfilled, (state,action)=>{
    //         const newItem = action.payload;
    //         const itemExists = state.cart.find((item)=> item.id === newItem.id);
    //         if(itemExists){
    //             itemExists.quantity++;
    //             itemExists.totalPrice += itemExists.price;
    //         }
    //         else{
    //             state.cart.push({
    //                 id:newItem.id,
    //                 title:newItem.title,
    //                 image:newItem.image,
    //                 category:newItem.category,
    //                 description:newItem.description,
    //                 price:newItem.price,
    //                 quantity:1,
    //                 totalPrice:newItem.price,
    //             })
    //         }
    //     })
    //     builder.addCase(increaseQuantityThunk.fulfilled, (state,action)=>{
    //         const itemId = action.payload;
    //         const itemExists = state.cart.find((item)=> item.id === itemId);
    //         if(itemExists){
    //             if(itemExists.quantity > 1 || itemExists.quantity === 1){
    //                 itemExists.quantity++;
    //                 itemExists.totalPrice += itemExists.price
    //             }
    //         }
    //     })
    //     builder.addCase(decreaseQuantityThunk.fulfilled, (state,action)=>{
    //         const itemId = action.payload;
    //         const itemExists = state.cart.find((item)=> item.id === itemId);
    //         if(itemExists){
    //             if(itemExists.quantity > 1){
    //                 itemExists.quantity--;
    //                 itemExists.totalPrice -= itemExists.price;
    //             }
    //             else{
    //                 state.cart = state.cart.filter((item)=> item.id !== itemId);
    //             }
    //         }
    //     })
    //     builder.addCase(deleteItemThunk.fulfilled, (state,action)=>{
    //         const targetedItem = action.payload;
    //         state.cart = state.cart.filter((item)=> item.id !== targetedItem);
    //     })
    //     builder.addCase(clearCartThunk.fulfilled, (state)=>{
    //         state.cart = [];
    //     })
    // },
});


export const { setUser, purchaseItem, increaseQuantity, decreaseQuantity, deleteItem, clearCart } = globalState.actions;
export default globalState.reducer;
