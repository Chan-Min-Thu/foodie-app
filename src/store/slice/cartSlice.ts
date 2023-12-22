import { CartItems } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface CartState{
    items:CartItems[],
    isLoading:boolean,
    error:null | Error
}
 
const initialState:CartState ={
   items:[],
   isLoading:true,
   error:null
}

const CartSlice =createSlice({
    name:"carts",
    initialState,
    reducers:{
        setCarts:(state,action:PayloadAction<CartItems>)=>{
            const exit = state.items.find((item)=> item.id === action.payload.id);
            if(exit){
               state.items = state.items.map(item=> item.id === action.payload.id ? action.payload :item)
            }else{
                state.items = [...state.items,action.payload]
            }
        },
        // updateCarts:(state,action:PayloadAction<CartItems>)=>{
          
        //     const filteredItems = state.items.filter(item => item.id !== action.payload.id);
        //     state.items = [...filteredItems,action.payload]
        // },
        removeCarts:(state,action:PayloadAction<CartItems>)=>{
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            state.items = filteredItems;
        },
        emptyCarts:(state)=>{
            state.items = [];
        }
    }
})

export const { setCarts,removeCarts,emptyCarts} = CartSlice.actions;

export default CartSlice.reducer;