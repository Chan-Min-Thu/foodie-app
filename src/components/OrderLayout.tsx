import Box from "@mui/material/Box";
import { ReactNode, useEffect, useState } from "react";
import OrderAppHeader from "./OrderAppHeader";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import { fetchAppData } from "@/store/slice/appSlice";
import { Company, ORDERSTATUS } from "@prisma/client";
import { Typography } from "@mui/material";
import { setLoading } from "@/store/slice/menuSlice";
import Loading from "./Loading";


interface Props {
  children: ReactNode;
}
const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  const [loading,setloading] = useState(true);
  const carts = useAppSelector((state) => state.carts.items);
  const orders = useAppSelector((state) => state.order.items);
  const company = useAppSelector((state) => state.company.item);
  const {init,isLoading} = useAppSelector(state=>state.app)
  const tableId = Number(router.query.tableId);
  const menuId = Number(router.query.id);
  const orderSeq = String(router.query.orderSeq);
  const isCart = router.pathname === "/order/carts";
 
  const isHome = tableId;
  const isMenu = menuId && tableId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ tableId }));
      setloading(false)
      dispatch(setLoading(loading))
    }
  }, [tableId,init]);
  const showFooterBar =
  !router.pathname.includes("active-order") && orders.length >0 && 
  orders.some(
    (item) => item.status === ORDERSTATUS.PENDING ||
      item.status === ORDERSTATUS.COOKING
  );
  return (
    <Box
      sx={{
        display: "flex",
        width:"100%",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        position: "relative",
      }}
    >
      <OrderAppHeader
        countCartItems={carts.length}
        company={company as Company}
      />

      <Box
        sx={{
          top: isHome ? {xs:60,sm:350} : 50,
          width: { xs: "100vw", sm: "80vw", md: "50vw" },
          mx: "auto",
          mt:{xs:10},
          pb:6
        }}
      >
        {init ? children :<Loading/>}
      </Box>
      {showFooterBar && (
        <Box
          onClick={() =>
            router.push(
              `/order/active-order/${String(
                orders[0]?.orderSeq
              )}?tableId=${tableId}`
            )
          }
          sx={{
            textAlign: "center",
            zIndex: 5,
            width: "100vw",
            bgcolor: "#4C4C6D",
            position: "fixed",
            bottom: 0,
          }}
        >
          <Typography variant="h6" sx={{ color: "info.main", m: 2 }}>
            You have active orders.Click here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderLayout;
