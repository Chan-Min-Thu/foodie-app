import Box from "@mui/material/Box"
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import { fetchAppData } from "@/store/slice/appSlice";
import { relative } from "path";

interface Props{
    children:ReactNode
}
const OrderLayout =({children}:Props)=>{
  const router = useRouter();
  const tableId = Number(router.query.tableId);
  const menuId = Number(router.query.id)
  const isHome =  tableId
  const isMenu =  menuId && tableId
  const carts = useAppSelector(state=>state.carts.items)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(tableId){
      dispatch(fetchAppData({tableId}))
    }
  },[tableId])
    return(
      <Box>
        <OrderAppHeader countCartItems={carts.length}/>
        <Box sx={{position:"relative",zIndex:5,top:isHome&& 350 || isMenu && 100}}>
          <Box sx={{width : {xs:"100%",md:"80%",lg:"55%"},m:"0 auto"}}>
            {children}
          </Box>
        </Box>
      </Box>
    )
}

export default OrderLayout;