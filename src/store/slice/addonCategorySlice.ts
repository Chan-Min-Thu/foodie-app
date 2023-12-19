import { AddOnCategories, CreateAddonCategory, DeleteAddonCategory, UpdateAddonCategory } from "@/types/addonCategory";
import { config } from "@/utlis/config";
import { AddOnCategory } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


const initialState: AddOnCategories ={
    items:[],
    isLoading:false,
    error:null
}

export const createAddonCategory = createAsyncThunk("addonCategory/CreateAddonCategory",async(option:CreateAddonCategory,thunkApi)=>{
  const {name,menuId,isRequired,onSuccess,isError} = option;
  try{
  const response = await fetch(`${config.apiBaseUrl}/addon-category`,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({name,menuId,isRequired})
  })
  const {addonCategory,addonCategoryMenu} = await response.json();
  thunkApi.dispatch(addAddonCategory(addonCategory))
  onSuccess && onSuccess();
}catch(err){
  isError && isError(err)
}
})

export const updateAddonCategory = createAsyncThunk("addonCategory/updateAddonCategory",async(option:UpdateAddonCategory,thunkApi)=>{
  const {id,name,menuId,isRequired,onSuccess,isError} = option;
  try{
  const response = await fetch(`${config.apiBaseUrl}/addon-category`,{
    method:"PUT",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({id,name,menuId,isRequired})
  })
  const data = await response.json();
  thunkApi.dispatch(replaceAddonCategory(data.addonCategory))
  onSuccess && onSuccess();
}catch(err){
  isError && isError(err)
}
})

export const deleteAddonCategory = createAsyncThunk("addonCategory/deleteAddonCategory",async(option:DeleteAddonCategory,thunkApi)=>{
  const {id,onSuccess,isError} = option
  try{
    await fetch(`${config.apiBaseUrl}/addon-category?id=${id}`,{
    method:"DELETE",
  })
  thunkApi.dispatch(removeAddonCategory({id}))
  onSuccess && onSuccess()
}catch{
  isError && isError();
}
})
export const addonCategorySlice = createSlice({
    name:"addonCategory",
    initialState,
    reducers:{
      setAddonCategory:(state,action)=>{
         state.items = action.payload
      },
      addAddonCategory:(state,action)=>{
        state.items = [...state.items,action.payload]
      },
      replaceAddonCategory:(state,action:PayloadAction<AddOnCategory>)=>{
         const otherAddonCategory = state.items.filter(item=> item.id !== action.payload.id) 
         state.items =[...otherAddonCategory,action.payload]
      },
      removeAddonCategory:(state,action:PayloadAction<{id:number}>)=>{
        state.items = state.items.filter(item=>item.id !== action.payload.id)
      }
    }
})

export const { setAddonCategory,addAddonCategory,replaceAddonCategory,removeAddonCategory } = addonCategorySlice.actions;
export  default addonCategorySlice.reducer