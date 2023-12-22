import { Order } from "@prisma/client";
import { CartItems } from "./cart";
import { BasicOptions } from "./menu";

export interface CreateOrder extends BasicOptions{
    tableId:number,
    cartItems:CartItems[]
}
export interface Orders{
    items:Order[],
    isLoading:boolean,
    error:null | Error
} 