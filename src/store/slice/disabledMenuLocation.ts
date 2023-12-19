import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { disabledMenuCategoryLocation } from "@/types/disabledMenuCategoryLocation";
import { disabledMenuLocationSlice } from "@/types/disabledMenuLocation";
import { DisabledMenuLocation } from "@prisma/client";
import { act } from "react-dom/test-utils";

const initialState: disabledMenuLocationSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const disabledMenuCategoryLocationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDisabledMenuLocation: (state, action) => {
      state.items = action.payload;
    },
    addDisabledMenuLocation: (state, action:PayloadAction<DisabledMenuLocation>) => {
      const exit= state.items.find(item=> item.id === action.payload.id)
      if(!exit){
        state.items = [...state.items, action.payload];
      }else{
        const filteredItems = state.items.filter(item=> item.id !== action.payload.id)
        state.items = [...filteredItems,action.payload]
      } 
    },
    removeDisabledMenuLocation: (state, action:PayloadAction<{id:number}>) => {
      const {id} = action.payload;
      const filteredItems = state.items.filter(item=> item.id !== id)
      state.items =filteredItems
    },
  },
});

export const { setDisabledMenuLocation,addDisabledMenuLocation,removeDisabledMenuLocation } =
  disabledMenuCategoryLocationSlice.actions;

export default disabledMenuCategoryLocationSlice.reducer;
