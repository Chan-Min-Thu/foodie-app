import { Menu } from "@prisma/client";
import { BasicOptions } from "./app";

export interface Menus {
    items:Menu[],
    isLoading:boolean,
    error:null | Error
} 

export interface CreateMenuOptions extends BasicOptions{
    name:string
    price:number,
    menuCategoryId:number[],
    imgUrl?:string
}
export  interface UpdateMenuOptions extends BasicOptions{
    id:number,
    name?:string,
    price?:number,
    menuCategoryId:number[],
    isAvaliable?:boolean,
    locationId?:number,
    imgUrl?:string | null
}
export  interface DeleteMenuOptions extends BasicOptions{
    id:number,
}