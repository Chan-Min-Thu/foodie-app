import { MenuCategory } from "@prisma/client";

export interface MenuCategories {
    items:MenuCategory[],
    isLoading:boolean,
    error:null | Error
} 

export interface BasicOptions{
    onSuccess?:(data?:any)=>void
    isError?:(data?:any)=>void
}
export interface MenuCategoryOptions extends BasicOptions{
    name:string,
    locationId:number    
}
export interface UpdateMenuCategoryOptions extends BasicOptions{
    id:number
    name:string
}