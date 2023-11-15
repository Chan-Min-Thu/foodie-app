import { AddOnCategoryMenu } from "@prisma/client";
import { BasicOptions } from "./menu";

export  interface addonCategoryMenu{
    items:AddOnCategoryMenu[],
    isLoading:boolean,
    error:Error | null
}

export interface CreateAddonCategoryMenuOption extends BasicOptions{
    menuId:number[],
    addonCategoryId:number
}