import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { disabledMenuCategoryLocation } from "@/types/disabledMenuCategoryLocation";

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
    addDisabledMenuCategoryLocation: (state, action) => {
      state.items = [...state.items, action.payload];
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
