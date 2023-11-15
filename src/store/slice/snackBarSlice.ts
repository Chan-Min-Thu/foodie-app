import { SnackBarSlice } from "@/types/snackBar";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState:SnackBarSlice={
    open:false,
    message:null,
    severity:"success",
    autoHideDuration:3000

}

const SnackBarSlice = createSlice({
    name:"SnackBar",
    initialState,
    reducers:{
     snackBarOpen:(state,action)=>{
        const {message,severity,autoHideDuration} = action.payload;
        state.open= true;
        state.message=message,
        state.severity = severity,
        state.autoHideDuration = autoHideDuration
     },
     snackBarClose:(state,action)=>{
        const {open,autoHideDuration} = action.payload;
        state.open = false;
        state.autoHideDuration = autoHideDuration;
     }
    }
})

export const { snackBarOpen,snackBarClose } = SnackBarSlice.actions;

export default SnackBarSlice.reducer;