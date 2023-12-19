import { CreateMenuOptions, DeleteMenuOptions, Menus, UpdateMenuOptions } from "@/types/menu";
import { config } from "@/utlis/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAddonCategoryMenu } from "./addonCategoryMenuSlice";
import { addDisabledMenuLocation, removeDisabledMenuLocation } from "./disabledMenuLocation";

const initialState: Menus = {
  items: [],
  isLoading: false,
  error: null,
};
// create Menu functions
export const createMenu = createAsyncThunk(
  "menu,createMenu",
  async (options: CreateMenuOptions, thunkApi) => {
    const { name, price, menuCategoryId,imgUrl, onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, price, menuCategoryId ,imgUrl}),
      });
      const data = await response.json();
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
    const { id, name, price, menuCategoryId, isAvaliable,locationId,onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id, name, price, menuCategoryId,isAvaliable,locationId }),
      });
      const data = await response.json(); // backend return value is {menu,menuCategoryMenu}
      thunkApi.dispatch(replaceMenu(data.menu));
      if(isAvaliable === false){
        return thunkApi.dispatch(addDisabledMenuLocation(data.disabledMenuLocation))
      }else if(isAvaliable === true){
        return thunkApi.dispatch(removeDisabledMenuLocation({id}))
      };
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
    },
    setIsLoading:(state,action:PayloadAction<boolean>)=>{
      state.isLoading = action.payload;
    }
  },
});

export const { setMenu, addMenu, replaceMenu,removeMenu,setIsLoading } = menuSlice.actions;
export default menuSlice.reducer;
