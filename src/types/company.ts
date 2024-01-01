import { Company } from "@prisma/client";
import { BasicOptions } from "./app";

export interface CompanySlice {
    item:Company | null,
    isLoading:boolean,
    error:null | Error
} 

export interface UpdateCompanyOptions extends BasicOptions{
    id:number;
    name:string;
    street:string;
    township:string;
    city:string
}

