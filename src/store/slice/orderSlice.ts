import {
  AddOns,
  CreateAddonOption,
  DeleteAddonOption,
  UpdateAddonOption,
} from "@/types/addon";
import { CreateOrder, Orders } from "@/types/order";
import {
  CreateTableOptions,
  DeleteTableOptions,
  Tables,
  UpdateTableOptions,
} from "@/types/table";
import { config } from "@/utlis/config";
import { AddOn, Order, Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

const initialState: Orders = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "table/createTable",
  async (option: CreateOrder, thunkApi) => {
    const { tableId, cartItems, onSuccess, isError } = option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });
      const { orders } = await response.json();
      thunkApi.dispatch(setOrder(orders));
      onSuccess && onSuccess(orders);
    } catch (err) {
      isError && isError;
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.items = [...state.items, ...action.payload];
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
