import { useAppDispatch, useAppSelector } from "@/store/hook";
import { config } from "@/utlis/config"
import { fetchAppData } from "@/store/slice/appSlice";
import { Box, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useEffect } from "react";

const Orders = ()=>{
    const {data:session} = useSession();
    // const dispatch = useAppDispatch()
    // const {init} = useAppSelector(state=>state.app)
    // useEffect(()=>{
    //   if(session && !init){
    //      dispatch(fetchAppData({}))
    //   }
    // },[session])
    
    return(
        <Box>
            <Typography>Order Page</Typography>
        </Box>
    )
}
export default Orders;