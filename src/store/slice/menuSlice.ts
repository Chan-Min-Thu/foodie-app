import { CreateMenuOptions, DeleteMenuOptions, Menus, UpdateMenuOptions } from "@/types/menu";
import { config } from "@/utlis/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddonCategoryMenu } from "./addonCategoryMenuSlice";

const initialState: Menus = {
  items: [],
  isLoading: false,
  error: null,
};
// create Menu functions
export const createMenu = createAsyncThunk(
  "menu,createMenu",
  async (options: CreateMenuOptions, thunkApi) => {
    const { name, price, menuCategoryId, onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, price, menuCategoryId }),
      });
      const data = await response.json();
      console.log("menu",data.menu)
      thunkApi.dispatch(addMenu(data.menu));
      onSuccess && onSuccess();
    } catch (error) {
      isError && isError(error);
    }
  }
);

//updatae Menu function
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (options: UpdateMenuOptions, thunkApi) => {
    const { id, name, price, menuCategoryId, onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id, name, price, menuCategoryId }),
      });
      const data = await response.json(); // backend return value is {menu,menuCategoryMenu}
      console.log(data.menu)
      thunkApi.dispatch(replaceMenu(data.menu));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError(err);
    }
  }
);
// delete menu function

export const deleteMenu = createAsyncThunk("menu/deleteMenu",async(option:DeleteMenuOptions,thunkApi)=>{
  const {id,onSuccess,isError} = option
  try{
   await fetch(`${config.apiBaseUrl}/menu?id=${id}`,{
    method:"DELETE",
  })
  // thunkApi.dispatch(setAddonCategoryMenu(addonCategoryMenu))
  thunkApi.dispatch(removeMenu({id}))
  onSuccess && onSuccess()
}catch(err){
  isError && isError(err)
}
})
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.items = action.payload;
    },
    addMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceMenu: (state, action) => {
      const otherMenus = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = [...otherMenus, action.payload];
    },
    removeMenu:(state,action:PayloadAction<{id :number}>)=>{
      state.items = state.items.filter(item=> item.id !== action.payload.id)
    }
  },
});

export const { setMenu, addMenu, replaceMenu,removeMenu } = menuSlice.actions;
export default menuSlice.reducer;
