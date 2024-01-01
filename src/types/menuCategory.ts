import { MenuCategory } from "@prisma/client";
import { BasicOptions } from "./app";

export interface MenuCategories {
    items:MenuCategory[],
    isLoading:boolean,
    error:null | Error
} 
 
export interface MenuCategoryOptions extends BasicOptions{
    name:string,
    locationId:number    
}
export interface UpdateMenuCategoryOptions extends BasicOptions{
    id:number
    name:string
    isAvailable:boolean
    locationId?:number
}
export interface DeleteMenuCategoryOptions extends BasicOptions{
    id:number
}