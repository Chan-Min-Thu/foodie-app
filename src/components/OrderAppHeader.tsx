import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import orderAppHeader from "../assets/order-app-header.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import { useEffect } from "react";
import { fetchAppData } from "@/store/slice/appSlice";
import React from "react";

interface Props {
  countCartItems: number;
}
const OrderAppHeader = ({ countCartItems }: Props) => {
  const router = useRouter();
  const isHome = router.pathname === `/order`;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh/4",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column ",
        position: "fixed",
        zIndex: "5",
      }}
    >
      <Box sx={{ position: "absolute", top: 20, right: "150px" }} onClick={()=>router.push("/order/carts")}>
        <ShoppingCartCheckoutIcon
          sx={{ fontSize: 30, color: "secondary.main" }}
        />
        <Typography
          sx={{
            position: "absolute",
            top: -10,
            right: -6,
            color: "secondary.main",
          }}
        >
          {countCartItems}
        </Typography>
      </Box>
      <Image
        src={orderAppHeader}
        alt="order-app-header"
        style={{ width: "100%",padding:0,margin:0,boxSizing:"border-box", objectFit: "cover" }}
      />
      {isHome && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, fontStyle: "italic", color: "primary.main" }}
          >
            Ahh Wah Sarr
          </Typography>
          <Typography sx={{ color: "primary.main" }}>
            56 street,105 and 106 bet,
            <br />
            Chan Mya Tharzi Township
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderAppHeader;