import {
  AddOns,
  CreateAddonOption,
  DeleteAddonOption,
  UpdateAddonOption,
} from "@/types/addon";
import { CreateOrder, Orders, UpdateOrder } from "@/types/order";
import {
  CreateTableOptions,
  DeleteTableOptions,
  Tables,
  UpdateTableOptions,
} from "@/types/table";
import { config } from "@/utlis/config";
import { AddOn, Order, Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Orders = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
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

export const updateOrder = createAsyncThunk(
  "order/UpdateOrder",
  async (options: UpdateOrder, thunkApi) => {
    const { itemId, status, onSuccess, isError } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/order?itemId=${itemId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const {orders} = await response.json();
      thunkApi.dispatch(updateOrderItem(orders))
      onSuccess && onSuccess
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
    updateOrderItem:(state,action:PayloadAction<UpdateOrder>)=>{
      const payloadItemId = String(action.payload.itemId)
      const otherOrders = state.items.filter(item=> item.itemId !== payloadItemId)
      state.items = state.items.map(item=>{
        const exit = state.items.find(item=> item.itemId === payloadItemId)
        if(exit){
           return {...exit,status:action.payload.status}
        }else{
            return item;
        }
      })
    }
  },
});

export const { setOrder,updateOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
4;
