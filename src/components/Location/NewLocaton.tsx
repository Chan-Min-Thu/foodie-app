import { useAppDispatch } from "@/store/hook";
import { createLocation } from "@/store/slice/locationSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { AddReaction } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react";

interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>
}
const NewLocation = ({open,setOpen}:Props)=>{
    const dispatch = useAppDispatch();
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const onSuccess = ()=>{
        setOpen(false)
        dispatch(snackBarOpen({
          message: "New Menu category created succcessfully.",
          severity: "success",
          open: true,
          autoHideDuration: 3000
        }))
    }
    const handleCreateLocation =()=>{
       dispatch(createLocation({name,address,onSuccess}))
    }
    return (
        <Dialog open={open} onClose={()=>setOpen(false)} sx={{minWidth:400}}>
            <DialogTitle>Create Location  </DialogTitle>
            <DialogContent sx={{display:"flex",flexDirection:"column"}}>
               <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(evt)=>setName(evt.target.value)} autoFocus sx={{mt:2}}/>
               <TextField id="outlined-basic" label="Address" variant="outlined" onChange={(evt)=>setAddress(evt.target.value)} autoFocus sx={{mt:2}}/>
            </DialogContent>
            <DialogContent sx={{display:"flex",justifyContent:"flex-end"}}>
                <Button variant="contained" sx={{mr:2}} onClick={()=>setOpen(false)}>Cancel</Button>
                <Button variant="contained"  onClick={()=>handleCreateLocation()}>Comfirm</Button>
            </DialogContent>
        </Dialog>
    )
}
export default NewLocation;

