import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    return (
      <Box>h</Box>
    );
  } else {
    router.push("/backoffice/order");
  }
}
