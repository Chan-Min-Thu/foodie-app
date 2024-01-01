import Box from "@mui/material/Box";
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import { fetchAppData } from "@/store/slice/appSlice";
import { relative } from "path";
import { Company } from "@prisma/client";
import { setCompany } from "@/store/slice/companySlice";
import { Typography } from "@mui/material";
import ActiveOrder from "@/pages/order/active-order/[id]";

interface Props {
  children: ReactNode;
}
const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  const tableId = Number(router.query.tableId);
  const menuId = Number(router.query.id);
  const orderSeq = String(router.query.orderSeq);
  const isCart = router.pathname === "/order/carts";
  const isActiveOrder = router.pathname.includes("/acitve-order");
  const isHome = tableId;
  const isMenu = menuId && tableId;
  const carts = useAppSelector((state) => state.carts.items);
  const orders = useAppSelector(state=>state.order.items);
  const company = useAppSelector((state) => state.company.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId }));
    }
  }, [tableId]);
  return (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100vh",position:"relative"}}>
      <OrderAppHeader
        countCartItems={carts.length}
        company={company as Company}
      />
      <Box sx={{position:"relative", top: isHome ? 350 : 50 }}>
        <Box sx={{ width: { xs: "100%", md: "80%", lg: "55%" }, mx: "auto",p:10 }}>
          {children}
        </Box>

      </Box>
      {!isActiveOrder && <Box onClick={()=>router.push(`order/active-order/${String(orders[0]?.orderSeq)}?tableId=${tableId}`)} sx={{textAlign: "center",zIndex:5, width:"100vw", bgcolor: "#4C4C6D",position:"fixed",bottom:0}}>
        <Typography variant="h6" sx={{color:"info.main",m:2}}>You have active orders.Click here.</Typography>
      </Box>}
    </Box>
  );
};

export default OrderLayout;
