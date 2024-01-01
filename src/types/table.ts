import { Table } from "@prisma/client";
import { BasicOptions } from "./app";

export interface Tables {
    items:Table[],
    isLoading:boolean,
    error:null | Error
} 

export interface CreateTableOptions extends BasicOptions{
    name:string | undefined;
    locationId?:number | undefined
}

export interface UpdateTableOptions extends BasicOptions{
    id:number
    name:string;
    assetUrl?:string
}

export interface DeleteTableOptions extends BasicOptions{
    id:number
}
