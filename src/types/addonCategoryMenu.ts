import { AddOnCategoryMenu } from "@prisma/client";
import { BasicOptions } from "./app";

export  interface addonCategoryMenu{
    items:AddOnCategoryMenu[],
    isLoading:boolean,
    error:Error | null
}

export interface CreateAddonCategoryMenuOption extends BasicOptions{
    menuId:number[],
    addonCategoryId:number
}