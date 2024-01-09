import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { refreshOrder } from "@/store/slice/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utlis/general/general";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = String(router.query.id);
  const tableId = router.query.tableId
  const orders = useAppSelector((state) => state.order.items);
  const addons = useAppSelector((state) => state.addon.items);
  const menus = useAppSelector(state=> state.menu.items);
  const tables = useAppSelector(state=> state.table.items);

  const dispatch = useAppDispatch();

  const orderItems = formatOrders(orders, addons,menus,tables) as OrderItem[];

  let intervalId :number;
  useEffect(()=>{
    if(orderSeq){
     intervalId = window.setInterval(handleRefreshOrder,3000)
    }
   return ()=>{
     window.clearInterval(intervalId);
   }
  },[orderSeq])

  const handleRefreshOrder = ()=>{
       dispatch(refreshOrder({orderSeq:String(orderSeq)}))
  }

  if(!orderItems) return null;
  return (
    <Box
      sx={{
        mt:{sm:10},
        width:"50vw",
        mx:"auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", bgcolor: "lightgreen", px: 3, py: 2, borderRadius: 10}}>
        <Typography sx={{ mb: 3 ,fontSize:"16px",alignItems:"center",m:"auto"}}>
          OrderSeq : {orderSeq}
          
        </Typography>
        <Typography sx={{ mb: 3 ,alignItems:"center",m:"auto"}}>
          Total Price: {orders[0]?.totalPrice}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent:"center", flexWrap:"wrap" }}>
        {orderItems.map((orderItem) => {
          return (
            <Box key={orderItem.itemId} sx={{ my: 2, mx: 2 ,display:"flex",flexWrap:"wrap"}}>
              <OrderCard
                orderItem={orderItem}
                isAdmin={false}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ActiveOrder;
