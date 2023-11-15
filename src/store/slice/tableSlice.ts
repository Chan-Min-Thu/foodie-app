import {
  AddOns,
  CreateAddonOption,
  DeleteAddonOption,
  UpdateAddonOption,
} from "@/types/addon";
import { CreateTableOptions, DeleteTableOptions, Tables, UpdateTableOptions } from "@/types/table";
import { config } from "@/utlis/config";
import { AddOn, Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

const initialState: Tables = {
  items: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (option: CreateTableOptions, thunkApi) => {
    const { name,locationId, onSuccess, isError } = option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/table`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name,locationId }),
      });
      const { table } = await response.json();
      // console.log("data addon", table);
      thunkApi.dispatch(addTable(table));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError;
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (option: UpdateTableOptions, thunkApi) => {
    const { id, name, onSuccess, isError } = option;

    try {
      const response = await fetch(`${config.apiBaseUrl}/table`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id, name }),
      });
      const { table } = await response.json();

      thunkApi.dispatch(replaceTable(table));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError();
    }
  }
);
export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (option: DeleteTableOptions, thunkApi) => {
    const { id, onSuccess, isError } = option;
    try {
      await fetch(`${config.apiBaseUrl}/table?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeTable({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      isError && isError(err);
    }
  }
);
export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.items = [...state.items, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      const otherTables = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = [...otherTables, action.payload];
      // console.log(state.items)
    },
    removeTable: (state, action: PayloadAction<{id:number}>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setTable, addTable, replaceTable,removeTable } = tableSlice.actions;
export default tableSlice.reducer;


