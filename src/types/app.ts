import { BasicOptions } from "./menu";

export interface AppSlice {
  init: boolean;
  isLoading: false;
  error: Error | null;
}

export interface AppOption extends BasicOptions {
  companyId?:number,
  tableId?:number
}
