import { MenuCategories, MenuCategoryOptions, UpdateMenuCategoryOptions } from "@/types/menuCategory";
import { config } from "@/utlis/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";


const initialState: MenuCategories ={
    items:[],
    isLoading:false,
    error:null
}
//createMenuCategory function
export const createMenuCategory = createAsyncThunk("menucategory/createMenuCategory",async(options:MenuCategoryOptions,thunkApi)=>{
    const {name,locationId,onSuccess,isError} = options
    try{
    const response = await fetch(`${config.apiBaseUrl}/menu-category`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({name,locationId})
    })
    const menuCategory = await response.json();
    console.log("menuCategory",menuCategory)
    thunkApi.dispatch(addMenuCategory(menuCategory))
    console.log("onSuccess",onSuccess)
    onSuccess && onSuccess()
    }catch(error){
       isError&&isError(error)
     }
})

//Updata Menu Category function

export const updateMenuCategory = createAsyncThunk("menuCategory/updateMenuCategory",async(options:UpdateMenuCategoryOptions,thunkApi)=>{
  const {id,name,onSuccess,isError} = options;
  try{
  const response = await fetch(`${config.apiBaseUrl}/menu-category`,{
    method:"PUT",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({id,name})
  })
  const menuCategory = await response.json();
  thunkApi.dispatch(replaceMenuCategory(menuCategory));
  onSuccess && onSuccess()
}catch(err){
  isError && isError(err)
}
})

export const menuCategorySlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
      setMenuCategory:(state,action)=>{
         state.items = action.payload
      },
      addMenuCategory:(state,actons)=>{
        state.items = [...state.items,actons.payload]
      },
      replaceMenuCategory:(state,action)=>{
        const otherMenuCategories =state.items.filter(item=>item.id !== action.payload.id)    
        state.items = [...otherMenuCategories,action.payload]
      }
    }
})

export const { setMenuCategory,addMenuCategory,replaceMenuCategory } = menuCategorySlice.actions;
export  default menuCategorySlice.reducer