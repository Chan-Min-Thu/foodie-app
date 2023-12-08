import OrderAppHeader from "@/components/OrderAppHeader";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import OrderAppHeaderImg from "@/assets/order-app-header.svg";

const Carts = ()=>{
    return(
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
        
        <Image
          src={OrderAppHeaderImg}
          alt="order-app-header"
          style={{ width: "100%", padding: 0, margin: 0, objectFit: "cover" }}
        />
        </Box>
    );
}
export default Carts;