import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { disabledMenuCategoryLocation } from "@/types/disabledMenuCategoryLocation";
import { DisabledMenuCategoryLocation } from "@prisma/client";

const initialState: disabledMenuCategoryLocation = {
  items: [],
  isLoading: false,
  error: null,
};

export const disabledMenuCategoryLocationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDisabledMenuCategoryLocation: (state, action) => {
      state.items = action.payload;
    },
    addDisabledMenuCategoryLocation: (state, action:PayloadAction<DisabledMenuCategoryLocation>) => {
      const exit = state.items.find(item=> item.id === action.payload.id)
      if(!exit){
      state.items = [...state.items, action.payload];
      }else{
       const filteredItems = state.items.filter(item=>item.id !==action.payload.id) 
       state.items = [...filteredItems,action.payload]
      }
    },
    removeDisabledMenuCategoryLocation: (state, action:PayloadAction<{id:number}>) => {
      const {id} = action.payload;
      const filteredItems = state.items.filter(item=> item.id !== id)
      state.items =filteredItems
    },
  },
});

export const { setDisabledMenuCategoryLocation,addDisabledMenuCategoryLocation,removeDisabledMenuCategoryLocation } =
  disabledMenuCategoryLocationSlice.actions;

export default disabledMenuCategoryLocationSlice.reducer;
