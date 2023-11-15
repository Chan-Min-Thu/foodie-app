import { Menu } from "@prisma/client";

export interface Menus {
    items:Menu[],
    isLoading:boolean,
    error:null | Error
} 

export interface BasicOptions{
    onSuccess?:(data?:any)=>void
    isError?:(data?:any)=>void
}
export interface CreateMenuOptions extends BasicOptions{
    name:string
    price:number,
    menuCategoryId:number[]
}
export  interface UpdateMenuOptions extends BasicOptions{
    id:number,
    name?:string,
    price?:number,
    menuCategoryId:number[]
}
export  interface DeleteMenuOptions extends BasicOptions{
    id:number,
}