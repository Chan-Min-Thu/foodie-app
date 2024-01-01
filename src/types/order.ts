import { AddOn, Menu, ORDERSTATUS, Order, Table } from "@prisma/client";
import { CartItems } from "./cart";
import { BasicOptions } from "./app";

export interface CreateOrder extends BasicOptions{
    tableId:number,
    cartItems:CartItems[]
}
export interface UpdateOrder extends BasicOptions{
    itemId:string,
    status:ORDERSTATUS
}
export interface Orders{
    items:Order[],
    isLoading:boolean,
    error:null | Error
} 
export interface OrderAddon{
    addonCategoryId:number,
    addons:AddOn[]
}
export interface RefreshOrder extends BasicOptions{
    orderSeq:string,
}

export interface OrderItem{
    itemId:string,
    menu:Menu,
    table:Table,
    orderAddons:OrderAddon[],
    status:ORDERSTATUS
}