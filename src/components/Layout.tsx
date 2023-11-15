import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slice/appSlice";
import { theme } from "@/utlis/theme";
import GoogleIcon from "@mui/icons-material/Google"
// import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  useEffect(() => {
    setOpen(open);
  }, []);

  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (session && !init) dispatch(fetchAppData({}));
  }, [session]);
  return (
    <Box>
      <TopBar open={open} setOpen={setOpen} />
      {session ? 
        <Box sx={{ display: "flex", justifyContent: session ? "" : "center" }}>
          <SideBar open={open} setOpen={setOpen} />
          <Box
            sx={{
              "&:mathces": { minWidth: "20vw" },
              "!&:mathces": { minWidth: 6 / 7 },
              mx: 2,
              my: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      :<Box
      sx={{
        display: "flex",
        maxWidth: "100vw",
        maxHeight:"80vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx:"auto",
        my:5
      }}
    >
      
        <Typography sx={{mx:2,mt:6}}>Please Sign In with Google</Typography>
        <Button
          variant="outlined"
          onClick={() => signIn("google", { callbackUrl: "/backoffice/orders" })}
        >
          <GoogleIcon sx={{ mr: 1, color: "blue" }} />
          Sign In With Google
        </Button>
    
    </Box>}
    </Box>
  );
};
export default Layout;
