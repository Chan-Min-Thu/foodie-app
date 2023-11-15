import { Table } from "@prisma/client";

export interface Tables {
    items:Table[],
    isLoading:boolean,
    error:null | Error
} 

export interface BasicOptions{
    onSuccess?:(data?:any)=>void
    isError?:(data?:any)=>void
}


export interface CreateTableOptions extends BasicOptions{
    name:string | undefined;
    locationId?:number | undefined
}

export interface UpdateTableOptions extends BasicOptions{
    id:number
    name:string;
}

export interface DeleteTableOptions extends BasicOptions{
    id:number
}
