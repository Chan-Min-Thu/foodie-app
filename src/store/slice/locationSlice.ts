import { CreateLocationOptions, Locations } from "@/types/location";
import { config } from "@/utlis/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: Locations ={
    items:[],
    selectedLocation:null,
    isLoading:false,
    error:null
}
export const createLocation = createAsyncThunk("location/createLocation",async(options:CreateLocationOptions,thunkApi)=>{
  const {name,address,onSuccess,isError} = options;
  try{
  const response = await fetch(`${config.apiBaseUrl}/location`,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({name,address})
  })
  const location = await response.json();
  thunkApi.dispatch(addLocation(location));
  onSuccess && onSuccess();
  }catch(err){
    isError && isError();
  }
})
export const locationSlice = createSlice({
    name:"location",
    initialState,
    reducers:{
      setLocation:(state,action)=>{
         state.items = action.payload
      },
      selectedLocation:(state,action:PayloadAction<Location>)=>{
        state.selectedLocation = action.payload
      },
      addLocation:(state,action)=>{
        state.items = [...state.items,action.payload]
      }
    }
})

export const { setLocation,addLocation,selectedLocation } = locationSlice.actions;
export  default locationSlice.reducer