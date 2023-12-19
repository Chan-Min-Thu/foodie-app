import { Location } from "@prisma/client";

export interface Locations {
    items:Location[],
    selectedLocation:Location | null;
    isLoading:boolean,
    error:null | Error
} 

export interface BasicOptions{
    onSuccess?:(data?:any)=>void
    isError?:(data?:any)=>void
}
export interface CreateLocationOptions extends BasicOptions{
    name:string
    address:string
}