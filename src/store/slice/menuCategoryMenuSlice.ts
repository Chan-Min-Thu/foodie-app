import { CreateMenuCategoryMenuOptions, MenuCategoryMenus } from "@/types/menuCategoryMenu";
import { config } from "@/utlis/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiBaseUrl } from "next-auth/client/_utils";



const initialState:MenuCategoryMenus={
    items:[],
    isLoading:false,
    error: null
}
// export const createMenuCategoryMenu = createAsyncThunk("menuCategoryMenu/createMenuCategoryMenu",async(options:CreateMenuCategoryMenuOptions,thunkApi)=>{
//     const {menuId,menuCategoryId,onSuccess,isError} = options
//     const response = await fetch(`${config.apiBaseUrl}/menu`)
//     // thunkApi.dispatch(setMenuCategoryMenu(menuCategoryId));
// })
export const menuCategoryMenuSlice = createSlice({
    name:"menuCategrouyMenu",
    initialState,
    reducers:{
       setMenuCategoryMenu:(state,action)=>{
        state.items=action.payload
       }
    }
})
export const {setMenuCategoryMenu} = menuCategoryMenuSlice.actions

export default menuCategoryMenuSlice.reducer;