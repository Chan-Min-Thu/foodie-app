import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hook";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utlis/general/general";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const orders = useAppSelector((state) => state.order.items);
  const addons = useAppSelector((state) => state.addon.items);

  const orderItems = formatOrders(orders, addons) as OrderItem[];

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ bgcolor: "lightgreen", px: 3, py: 2, borderRadius: 10}}>
        <Typography variant="h4" sx={{ mb: 3 ,alignItems:"center",m:"auto"}}>
          OrderSeq : {orderSeq}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap:"wrap" }}>
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
