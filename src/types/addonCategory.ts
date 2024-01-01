import { AddOnCategory } from "@prisma/client";
import { BasicOptions } from "./app";

export interface AddOnCategories {
    items:AddOnCategory[],
    isLoading:boolean,
    error:null | Error
} 

export interface CreateAddonCategory extends BasicOptions{
    name:string,
    menuId:number[],
    isRequired:boolean
}

export interface UpdateAddonCategory extends BasicOptions{
    id:number,
    name:string | undefined,
    menuId:number[],
    isRequired:boolean | undefined,
}
export interface DeleteAddonCategory extends BasicOptions{
    id:number
}