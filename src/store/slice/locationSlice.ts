import { CreateLocationOptions, Locations } from "@/types/location";
import { config } from "@/utlis/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState: Locations = {
  items: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
};
export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (options: CreateLocationOptions, thunkApi) => {
    const { street, township, city, onSuccess, isError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ street, township, city }),
      });
      const location = await response.json();
      thunkApi.dispatch(addLocation(location));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError();
    }
  }
);
export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.items = action.payload;
      const locationId = Number(localStorage.getItem("selectedlocationId"))
      if(!locationId){
        const locationId = state.items[0].id;
        locationId && localStorage.setItem("selectedlocationId",String(locationId))
        state.selectedLocation = action.payload[0] 
      }else{
        const location = state.items.find(item=> item.id === locationId) as Location
        state.selectedLocation = location
      }
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
      localStorage.setItem("selectedlocationId",String(action.payload.id))
    },
    addLocation: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setLocation, addLocation, setSelectedLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
