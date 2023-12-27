import { useAppDispatch, useAppSelector } from "@/store/hook";
import { config } from "@/utlis/config"
import { fetchAppData } from "@/store/slice/appSlice";
import { Box, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { formatOrders } from "@/utlis/general/general";
import { OrderItem } from "@/types/order";
import { updateOrder } from "@/store/slice/orderSlice";
import { ORDERSTATUS } from "@prisma/client";

const Orders = ()=>{
    const {data:session} = useSession();
    const orders = useAppSelector(state=>state.order.items)
    const addons = useAppSelector(state=>state.addon.items)
    const [orderItems,setOrderItems] = useState<OrderItem[]>()
   
    const dispatch = useAppDispatch()
    const {init} = useAppSelector(state=>state.app)
    // useEffect(()=>{
    //   if(session && !init){
    //      dispatch(fetchAppData({}))
    //   }
    // },[session])
    useEffect(()=>{
    const orderItems = formatOrders(orders,addons);
    setOrderItems(orderItems)
    },[orderItems])
    const hanldeUpdateStatus =(itemId:string,status:ORDERSTATUS)=>{
        dispatch(updateOrder({itemId,status}))
    }
    return(
        <Box sx={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
           {orderItems?.map(orderItem=>{
            return(<OrderCard orderItem={orderItem} isAdmin={true} handleUpdateStatus={hanldeUpdateStatus}/>)
           })}
        </Box>
    )
}
export default Orders;