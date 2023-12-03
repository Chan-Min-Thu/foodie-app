import Box from "@mui/material/Box"
import { ReactNode } from "react";

interface Props{
    children:ReactNode
}
const OrderLayout =({children}:Props)=>{
    return(
      <Box>
        <h1>Order App component</h1>
      </Box>
    )
}

export default OrderLayout;