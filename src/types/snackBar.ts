type SnackBarSeverity = "success" | "error"
export interface SnackBarSlice{
   open:boolean,
   autoHideDuration:number,
   message:string | null,
   severity:SnackBarSeverity
}