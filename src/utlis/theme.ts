import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette:{
        primary:{
            main:"#4C4C6D"
        },
        secondary:{
            main:"#FFE194"
        },
        info:{
            main:"#E8F6EF"
        },
        success:{
            main:"#1B9C85"
        } 
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
})