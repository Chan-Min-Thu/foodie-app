export interface AppSlice {
  init: boolean;
  isLoading: false;
  error: Error | null;
}
export interface BasicOptions{
  onSuccess?:(data?:any)=>void
  isError?:(data?:any)=>void
}
export interface AppOption extends BasicOptions {
   tableId?:number
}
