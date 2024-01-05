import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import orderAppHeader from "../assets/order-app-header.svg";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import { useEffect } from "react";
import { fetchAppData } from "@/store/slice/appSlice";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Company } from "@prisma/client";

interface Props {
  countCartItems: number;
  company: Company;
}
const OrderAppHeader = ({ countCartItems, company }: Props) => {
  const router = useRouter();
  const tableId = router.query.tableId;
  const isHome = router.pathname === `/order`;
  const isCart = router.pathname === "/order/carts";
  const isActiveOrder = router.pathname === "/order/activeOrder";
  const showCartIcon = !isCart && !isActiveOrder && isHome;
  if (!company) return null;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column ",
        position: "fixed",
        zIndex: "5",
      }}
    >
      <Box
        sx={{
          display: { sx: "block", sm: "none" },
          bgcolor: "success.main",
          height: 50,
          px: 2,
          my: "auto",
        }}
      >
        <Typography
          sx={{
            color: "#FFE194",
            fontWeight: 800,
            mt: 2,
          }}
        >
          {company.name}
        </Typography>
        {showCartIcon ? (
          <Box
            sx={{ position: "absolute", zIndex: 3, top: {xs:10,sm:15}, right: {xs:"20px",sm:"100px"} }}
            onClick={() =>
              router.push({
                pathname: "/order/carts",
                query: {
                  tableId: router.query.tableId,
                },
              })
            }
          >
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
        ) : (
          <Box
            sx={{ position: "absolute", top: {xs:10,sm:15}, right: {xs:"20px",sm:"100px"}  }}
            onClick={() =>
              router.push({
                pathname: "/order",
                query: {
                  tableId,
                },
              })
            }
          >
            <HomeIcon sx={{ fontSize: 30, color: "secondary.main" }} />
          </Box>
        )}
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        {showCartIcon ? (
          <Box
            sx={{ position: "absolute", zIndex: 3, top: 20, right: "150px" }}
            onClick={() =>
              router.push({
                pathname: "/order/carts",
                query: {
                  tableId: router.query.tableId,
                },
              })
            }
          >
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
        ) : (
          <Box
            sx={{ position: "absolute", top: 20, right: "150px" }}
            onClick={() =>
              router.push({
                pathname: "/order",
                query: {
                  tableId,
                },
              })
            }
          >
            <HomeIcon sx={{ fontSize: 30, color: "secondary.main" }} />
          </Box>
        )}
        <Image
          src={orderAppHeader}
          alt="order-app-header"
          style={{ width: "100%", padding: 0, margin: 0, objectFit: "cover" }}
        />
        {isHome && (
          <Box
            sx={{
              width: "100%",
              mt: 0,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mt: 0,
                fontStyle: "italic",
                color: "primary.main",
              }}
            >
              {company.name}
            </Typography>
            <Typography sx={{ color: "primary.main" }}>
              {company.street}
              <br />
              {company.township},{company.city}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderAppHeader;
