import { AddOn } from "@prisma/client";

export interface AddOns {
    items:AddOn[],
    isLoading:boolean,
    error:null | Error
} 

export interface CreateAddonOption extends BasicOptions{
    name:string | undefined,
    price:number | undefined,
    addonCategoryId:number | undefined
}
export interface UpdateAddonOption extends BasicOptions{
    id:number,
    name:string | undefined,
    price:number | undefined,
    addonCategoryId:number | undefined
}
export interface DeleteAddonOption extends BasicOptions{
    id:number
}
export interface BasicOptions{
    onSuccess?:(data?:any)=>void
    isError?:(data?:any)=>void
}
