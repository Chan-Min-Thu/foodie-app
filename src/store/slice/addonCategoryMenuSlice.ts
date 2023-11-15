
import { addonCategoryMenu } from "@/types/addonCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";


const initialState:addonCategoryMenu={
    items:[],
    isLoading:false,
    error:null
}

const addonCategoryMenuSlice = createSlice({
    name:"addonCategoryMenu",
    initialState,
    reducers:{
        setAddonCategoryMenu:(state,action)=>{
            state.items = action.payload
        }
    }
})

export const { setAddonCategoryMenu } = addonCategoryMenuSlice.actions;

export default addonCategoryMenuSlice.reducer;