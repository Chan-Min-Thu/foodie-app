import { Box, Button, Drawer, SwipeableDrawer, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo.png";
import { signOut, useSession } from "next-auth/react";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useState } from "react";
import SideBar from "./SideBar";


interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const TopBar = ({ open, setOpen }: Props) => {
  const { data: session } = useSession();
  const [openDrawer,setOpenDrawer] = useState(false);
  const locations = useAppSelector((state) => state.location.items);
  const location = useAppSelector((state) => state.location.selectedLocation);

  const dispatch = useAppDispatch();

  function toggleDrawer(right: any, arg1: boolean): import("react").ReactEventHandler<{}> {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      sx={{
        position:"sticky",
        top:0,
        zIndex:5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        px: 2,
        py: 2,
        bgcolor: "success.main",
      }}
    >
      <Box sx={{ width: 90, display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: 70 }}>
          <Image
            src={logo}
            alt="logo"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" color={"secondary.main"}>
          Foodie App
        </Typography>
        {location && <Typography color={"secondary.main"}>({location?.township})</Typography>}
      </Box>
      {session ? (
        <Box>
          <Button
            variant="contained"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "secondary.main",
              fontSize: 12,
            }}
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
          >
            Sign Out
          </Button>
          <MenuIcon sx={{fontSize:30,color:"info.main",display:{xs:"block",sm:"none"}}} onClick={()=>setOpenDrawer(true)}/>
        </Box>
      ) : (
        <span />
      )}
        <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={()=>setOpenDrawer(false)}
    >
      <SideBar/>
    </Drawer>
    </Box>
  );
};
export default TopBar;
