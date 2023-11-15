import { useAppDispatch, useAppSelector } from "@/store/hook";
import { snackBarClose } from "@/store/slice/snackBarSlice";
import { Alert, Snackbar as MuiSnackBar } from "@mui/material";

const SnackBar = () => {
    const {open,severity,autoHideDuration,message} = useAppSelector(state=>state.snackBar)
    const dispatch = useAppDispatch();
    setTimeout(()=>dispatch(snackBarClose({open,autoHideDuration:3000})),3000)
  return (
    <MuiSnackBar open={open} autoHideDuration={autoHideDuration} 
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackBar>
  );
};
export default SnackBar
