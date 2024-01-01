import { MenuCategoryMenu } from "@prisma/client";
import { BasicOptions } from "./app";

export interface MenuCategoryMenus {
    items:MenuCategoryMenu[],
    isLoading:boolean,
    error:null | Error
} 

export interface CreateMenuCategoryMenuOptions extends BasicOptions{
    menuId:number
    menuCategoryId:number[]
}
