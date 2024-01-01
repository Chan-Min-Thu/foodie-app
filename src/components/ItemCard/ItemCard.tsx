import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, Paper, Typography } from "@mui/material";
import { relative } from "path";
import React from "react";
import { ReactNode } from "react";

export interface Props {
  name: string;
  icon: ReactNode;
  subTitle?: string;
  href?: string;
  isAvailable?:boolean,
  selected?:boolean
  onClick?:()=>void;
}
const ItemCard = ({ name, icon, href ,isAvailable,selected,onClick}: Props) => {
  if (href) {
    return (
      <Link href={href} style={{textDecoration:"none"}}>
        <Paper
          elevation={4}
          sx={{
            minWidth: 100,
            minHeight: 100,
            px: 2,
            py: 2,
            m: 3,
            opacity:isAvailable === false ? 0.4 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position:"relative"
          }}
        >
          
          {icon}
          <Typography
            sx={{ textAlign: "center", fontSize: 12, fontWeight: 500 }}
          >
            {name}
          </Typography>
        </Paper>
      </Link>
    );
  }
  return (
    <Paper
      elevation={4}
      sx={{
        minWidth: 100,
        minHeight: 100,
        px: 2,
        py: 2,
        m: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position:"relative"
      }}
      onClick={()=>onClick && onClick()}
    >{ selected && <CheckCircleIcon sx={{position:"absolute",top:10,right:10,fontSize:20,color:"success.main"}}/>}
      {icon}
      <Typography sx={{ textAlign: "center", fontSize: 12, fontWeight: 500 }}>
        {name}
      </Typography>
    </Paper>
  );
};
export default ItemCard;
