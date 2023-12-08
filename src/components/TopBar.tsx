import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { theme } from "@/utlis/theme";
import { Span } from "next/dist/trace";
import SegmentIcon from '@mui/icons-material/Segment';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

interface Props{
  open:boolean,
  setOpen:(value:boolean)=>void
}
const TopBar = ({open,setOpen}:Props) => {
  const { data: session } = useSession();
  
  // console.log('open',open)
  const matches = useMediaQuery(theme.breakpoints.between("xs","sm"));
  console.log(matches);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        px: 2,
        py: 2,
        bgcolor: "success.main",
      }}
    >
      <Box sx={{ width:90,display:"flex",flexDirection:"row"}}>
        {open?<CloseIcon onClick={()=>setOpen(false)} sx={{display:matches?"block":"none",color:"info.main",mr:2}}/>:<SegmentIcon onClick={()=>setOpen(true)} sx={{display:matches?"block":"none",color:"info.main",mr:2}}/>}
        <Box sx={{width:70}}>
        <Image
          src={Logo}
          alt="logo"
          style={{ width: "100%", height: "100%" }}
        />
        </Box>
      </Box>
      <Typography variant="h5" sx={{display:!matches?"block":"none"}} color={"secondary.main"}>
        Foodie App
      </Typography>
      {session ? (
        <Button variant="contained" sx={{ color: "secondary.main" ,fontSize:12}} onClick={()=>signOut({callbackUrl:"/backoffice"})}>
          Sign Out
        </Button>
      ) : <span/>
      }
    </Box>
  );
};
export default TopBar;
