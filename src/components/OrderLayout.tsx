import Box from "@mui/material/Box"
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
// import { Padding } from "@mui/icons-material";
import { useAppDispatch } from "@/store/hook";
import { useRouter } from "next/router";
import { fetchAppData } from "@/store/slice/appSlice";

interface Props{
    children:ReactNode
}
const OrderLayout =({children}:Props)=>{
    const router = useRouter();
    const companyId = Number(router.query.companyId);
    const tableId = Number(router.query.tableId)
    const isHome = router.pathname === "/order"
    const dispatch = useAppDispatch();
    useEffect(()=>{
      if(companyId && tableId){
      dispatch(fetchAppData({companyId,tableId}))
      }
    },[companyId])
    return(
      <Box sx={{boxSizing:"border-box",padding:0,margin:"0",display:"flex"}}>
        <OrderAppHeader countCartItems={1}/>
        <Box sx={{position:"relative",zIndex:5,top:isHome?400:0,m:10}}>
        {children}
        </Box>
      </Box>
    )
}

export default OrderLayout;