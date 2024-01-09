import { Box, Button, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData, setLoading } from "@/store/slice/appSlice";


import { useRouter } from "next/router";
import Loading from "./Loading";
// import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  children: ReactNode;
}
const BackofficeLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading,setloading] = useState(true);

  const dispatch = useAppDispatch();
  const { init,isLoading} = useAppSelector((state) => state.app);

  useEffect(() => {
    if (session && !init){
       dispatch(setLoading(loading))
       dispatch(fetchAppData({}));
      setloading(false)
    }
  }, [session, init]);
  if(session &&!init &&loading) return <Loading/>
  return (
    <Box>
      <TopBar open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex", justifyContent: session ? "" : "center"}}>
        {session && (
          <Box sx={{display:{xs:"none",sm:"block"}}}>
            <SideBar />
          </Box>
        )}
        <Box
          sx={{minWidth: { xs: "100vw * 0.9 ", sm: "100vw * 0.75",},
            mx:2,
            height:"90vh",
            my: 2,
          }}
        >
          {children }
        </Box>
      </Box>
    </Box>
  );
};
export default BackofficeLayout;
