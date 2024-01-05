import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { signIn, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slice/appSlice";
import { theme } from "@/utlis/theme";
import GoogleIcon from "@mui/icons-material/Google";
import Home from "@/pages";
import { useRouter } from "next/router";
import { Location } from "@prisma/client";
// import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  children: ReactNode;
}
const BackofficeLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);


  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (session && !init) dispatch(fetchAppData({}));
  }, [session, init]);
  return (
    <Box>
      <TopBar open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex", justifyContent: session ? "" : "center" }}>
        {session && (
          <Box sx={{display:{xs:"none",sm:"block"}}}>
            <SideBar />
          </Box>
        )}
        <Box
          sx={{
            minWidth: { xs: "100vw * 0.9 ", sm: "100vw * 0.7" },
            mx:2,
            my: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default BackofficeLayout;
