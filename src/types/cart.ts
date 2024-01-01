import { AddOn, Menu } from "@prisma/client";
import { BasicOptions } from "./app";

export interface CartItems{
    menu:Menu,
    id:string,
    quantity:number,
    addons:AddOn[]
}