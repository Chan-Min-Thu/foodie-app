import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenus {
    items:MenuCategoryMenu[],
    isLoading:boolean,
    error:null | Error
} 

export interface BasicOptions{
    onSuccess?:(data?:any)=>void
    isError?:(data?:any)=>void
}
export interface CreateMenuCategoryMenuOptions extends BasicOptions{
    menuId:number
    menuCategoryId:number[]
}
