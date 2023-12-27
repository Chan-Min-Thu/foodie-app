import { AddOn, ORDERSTATUS, Order } from "@prisma/client";
import { CartItems } from "./cart";
import { BasicOptions } from "./menu";

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

export interface OrderItem{
    itemId:string,
    orderAddons:OrderAddon[],
    status:ORDERSTATUS
}