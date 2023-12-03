import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { disabledMenuCategoryLocation } from "@/types/disabledMenuCategoryLocation";
import { disabledMenuLocationSlice } from "@/types/disabledMenuLocation";

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
    addDisabledMenuLocation: (state, action) => {
      state.items = [...state.items, action.payload];
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
