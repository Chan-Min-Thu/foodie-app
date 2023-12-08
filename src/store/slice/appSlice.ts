import { AppOption, AppSlice } from "@/types/app";
import { config } from "@/utlis/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { setMenuCategory } from "./menuCategorySlice";
import { setMenu } from "./menuSlice";
import { setAddon } from "./addonSlice";
import { setTable } from "./tableSlice";
import { setLocation } from "./locationSlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { setAddonCategoryMenu } from "./addonCategoryMenuSlice";
import { setDisabledMenuCategoryLocation } from "./disabledMenuCategoryLocation";
import { setDisabledMenuLocation } from "./disabledMenuLocation";
import { table } from "console";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};
export const fetchAppData = createAsyncThunk(
  "/app/fetchData",
  async (payload: AppOption, thunkApi) => {
    const {companyId,tableId, onSuccess, isError } = payload;
    try {
      const response = companyId && tableId ? await fetch(`${config.apiBaseUrl}/app?companyId=${companyId}&tableId=${tableId}`): await fetch(`${config.apiBaseUrl}/app`);
      const datafromServer = await response.json();
      const {
        menuCategories,
        menus,
        addOnCategories,
        addons,
        tables,
        locations,
        menuCategoryMenus,
        addOnCategoryMenus,
        disabledMenuCategoryLocation,
        disabledMenuLocation,
      } = datafromServer;
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setMenuCategory(menuCategories));
      thunkApi.dispatch(setMenu(menus));
      thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenus));
      thunkApi.dispatch(setAddonCategory(addOnCategories));
      thunkApi.dispatch(setAddonCategoryMenu(addOnCategoryMenus));
      thunkApi.dispatch(setAddon(addons));
      thunkApi.dispatch(setTable(tables));
      thunkApi.dispatch(setLocation(locations));
      thunkApi.dispatch(
        setDisabledMenuCategoryLocation(disabledMenuCategoryLocation)
      );
      thunkApi.dispatch(setDisabledMenuLocation(disabledMenuLocation));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError(err);
    }
  }
);
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;

export default appSlice.reducer;
