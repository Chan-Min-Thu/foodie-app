import {
  AddOns,
  CreateAddonOption,
  DeleteAddonOption,
  UpdateAddonOption,
} from "@/types/addon";
import { config } from "@/utlis/config";
import { AddOn } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

const initialState: AddOns = {
  items: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (option: CreateAddonOption, thunkApi) => {
    const { name, price, addonCategoryId, onSuccess, isError } = option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/addon`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, price, addonCategoryId }),
      });
      const { addon } = await response.json();
      thunkApi.dispatch(addAddon(addon));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError;
    }
  }
);

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (option: UpdateAddonOption, thunkApi) => {
    const { id, name, price, addonCategoryId, onSuccess, isError } = option;

    try {
      const response = await fetch(`${config.apiBaseUrl}/addon`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id, name, price, addonCategoryId }),
      });
      const { addon } = await response.json();

      thunkApi.dispatch(replaceAddon(addon));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError();
    }
  }
);
export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (option: DeleteAddonOption, thunkApi) => {
    const { id, onSuccess, isError } = option;
    try {
      await fetch(`${config.apiBaseUrl}/addon?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeAddon({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError(err);
    }
  }
);
export const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action) => {
      state.items = action.payload;
    },
    addAddon: (state, action: PayloadAction<AddOn>) => {
      state.items = [...state.items, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<AddOn>) => {
      const otherAddons = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = [...otherAddons, action.payload];
    },
    removeAddon: (state, action: PayloadAction<{id:number}>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setAddon, addAddon, replaceAddon,removeAddon } = addonSlice.actions;
export default addonSlice.reducer;


