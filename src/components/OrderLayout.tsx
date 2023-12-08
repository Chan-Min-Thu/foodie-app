import Box from "@mui/material/Box"
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
import { useAppDispatch } from "@/store/hook";
import { useRouter } from "next/router";
import { fetchAppData } from "@/store/slice/appSlice";
import { relative } from "path";

interface Props{
    children:ReactNode
}
const OrderLayout =({children}:Props)=>{
  const router = useRouter();
  const companyId = Number(router.query.companyId);
  const tableId = Number(router.query.tableId);
  const isHome = router.pathname === "/order"
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(companyId && tableId){
      dispatch(fetchAppData({companyId,tableId}))
    }
  },[companyId,tableId])
    return(
      <Box>
        <OrderAppHeader countCartItems={1}/>
        <Box sx={{position:"relative",zIndex:5,top:isHome?450:0}}>
          <Box sx={{width : {xs:"100%",md:"80%",lg:"55%"},m:"0 auto"}}>
            {children}
          </Box>
        </Box>
      </Box>
    )
}

export default OrderLayout;