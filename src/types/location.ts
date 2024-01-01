import { Location } from "@prisma/client";
import { BasicOptions } from "./app";

export interface Locations {
    items:Location[],
    selectedLocation:Location | null;
    isLoading:boolean,
    error:null | Error
} 

export interface CreateLocationOptions extends BasicOptions{
    street:string
    township:string
    city:string
}