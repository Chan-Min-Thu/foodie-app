import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { theme } from "@/utlis/theme";
import { Span } from "next/dist/trace";
import SegmentIcon from "@mui/icons-material/Segment";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectedLocation } from "@/store/slice/locationSlice";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const TopBar = ({ open, setOpen }: Props) => {
  const { data: session } = useSession();
  // const [selectedLocation,setSelectedLocation] = useState<Location>()

  const matches = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const locations = useAppSelector((state)=> state.location.items);
  const location = useAppSelector((state) => state.location.selectedLocation);

  const dispatch = useAppDispatch();

  useEffect(()=>{
     const selectedLocationId = Number(localStorage.getItem("selectedlocationId"))
     if(selectedLocationId){
     const location = locations.find(item=>item.id === selectedLocationId);
    location && dispatch(selectedLocation(location))
     }else{
      const location = locations[0];
      dispatch(selectedLocation(location))
     }
  },[locations,location])
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
      <Box sx={{ width: 90, display: "flex", flexDirection: "row" }}>
        {open ? (
          <CloseIcon
            onClick={() => setOpen(false)}
            sx={{
              display: matches ? "block" : "none",
              color: "info.main",
              mr: 2,
            }}
          />
        ) : (
          <SegmentIcon
            onClick={() => setOpen(true)}
            sx={{
              display: matches ? "block" : "none",
              color: "info.main",
              mr: 2,
            }}
          />
        )}
        <Box sx={{ width: 70 }}>
          <Image
            src={logo}
            alt="logo"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
      <Box
        sx={{ display: !matches ? "flex" : "none", flexDirection: "column",alignItems:"center",justifyContent:"center"}}
      >
        <Typography variant="h5" color={"secondary.main"}>
          Foodie App
        </Typography>
        <Typography color={"secondary.main"}>({location?.name})</Typography>
      </Box>
      {session ? (
        <Button
          variant="contained"
          sx={{ color: "secondary.main", fontSize: 12 }}
          onClick={() => signOut({ callbackUrl: "/backoffice" })}
        >
          Sign Out
        </Button>
      ) : (
        <span />
      )}
    </Box>
  );
};
export default TopBar;
