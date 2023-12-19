import {
  DeleteMenuCategoryOptions,
  MenuCategories,
  MenuCategoryOptions,
  UpdateMenuCategoryOptions,
} from "@/types/menuCategory";
import { config } from "@/utlis/config";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import { addDisabledMenuCategoryLocation, removeDisabledMenuCategoryLocation } from "./disabledMenuCategoryLocation";

const initialState: MenuCategories = {
  items: [],
  isLoading: false,
  error: null,
};
//createMenuCategory function
export const createMenuCategory = createAsyncThunk(
  "menucategory/createMenuCategory",
  async (options: MenuCategoryOptions, thunkApi) => {
    const { name, locationId, onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, locationId }),
      });
      const menuCategory = await response.json();
      thunkApi.dispatch(addMenuCategory(menuCategory));
      onSuccess && onSuccess();
    } catch (error) {
      isError && isError(error);
    }
  }
);

//Updata Menu Category function

export const updateMenuCategory = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async (options: UpdateMenuCategoryOptions, thunkApi) => {
    const { id, name, isAvailable, locationId, onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, isAvailable, locationId }),
      });
      const {menuCategory,disabledMenuCategoryLocation} = await response.json();
      thunkApi.dispatch(replaceMenuCategory(menuCategory));
      if(isAvailable === false){
        thunkApi.dispatch(addDisabledMenuCategoryLocation(disabledMenuCategoryLocation))
      }else{
        thunkApi.dispatch(removeDisabledMenuCategoryLocation({id}))
      }
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError(err);
    }
  }
);
export const deleteMenuCatagory = createAsyncThunk(
  "menuCategory/deleteMenuCategory",
  async (options: DeleteMenuCategoryOptions, thunkApi) => {
    const { id, onSuccess, isError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/menu-category?id=${id}`, {
        method: "DELETE",
      });

      thunkApi.dispatch(removeMenuCategory({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError(err);
    }
  }
);

export const menuCategorySlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuCategory: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, actons) => {
      state.items = [...state.items, actons.payload];
    },
    replaceMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      const otherMenuCategories = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...otherMenuCategories, action.payload];
    },
    removeMenuCategory: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const filteredItems = state.items.filter((item) => item.id !== id);
      state.items = filteredItems;
    },
  },
});

export const {
  setMenuCategory,
  addMenuCategory,
  replaceMenuCategory,
  removeMenuCategory,
} = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
