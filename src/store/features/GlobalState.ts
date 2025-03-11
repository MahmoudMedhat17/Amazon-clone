import { createSlice } from "@reduxjs/toolkit";



export const globalState = createSlice({
    name:"globalStateReducer",
    initialState:{
        user:null,
        cart:[]
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        }
    }
});


export const { setUser } = globalState.actions;
export default globalState.reducer;


