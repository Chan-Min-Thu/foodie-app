import { Box, Typography, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

const Home = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Box
        sx={{
          display: "flex",
          maxWidth: "100vw",
          maxHeight: "80vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          my: 5,
        }}
      >
        <Typography sx={{ mx: 2, mt: 6 }}>
          Please Sign In with Google
        </Typography>
        <Button
          variant="outlined"
          onClick={() =>
            signIn("google", { callbackUrl: "/backoffice/orders" })
          }
        >
          <GoogleIcon sx={{ mr: 1, color: "blue" }} />
          Sign In With Google
        </Button>
      </Box>
    );
  }
};

export default Home