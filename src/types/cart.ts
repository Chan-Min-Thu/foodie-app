import { AddOn, Menu } from "@prisma/client";
import { BasicOptions } from "./menu";

export interface CartItems{
    menu:Menu,
    id:string,
    quantity:number,
    addons:AddOn[]
}