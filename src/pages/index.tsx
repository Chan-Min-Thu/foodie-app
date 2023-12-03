import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

export default function Home() {
  return(
  <Box>
    <h1>This is home page.</h1>
  </Box>)
}
