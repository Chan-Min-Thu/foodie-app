import NewMenu from "@/components/NewMenu/NewMenu";
import MenuCard from "@/components/ItemCard/MenuCard"
import { useAppSelector } from "@/store/hook";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { theme } from "@/utlis/theme";
import { Menu } from "@prisma/client";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.between("xs","md"))
  const menus = useAppSelector((state) => state.menu.items);
  const disabledMenuLocations = useAppSelector((state)=>state.disabledMenuLocation.items)
  console.log(menus)
  if(!menus) return null;
  return (
    <Box sx={{width:matches? "100%":"80vw"}}>
      <Box sx={{display:"flex",justifyContent:"flex-end" }}>
        <Button variant="contained" sx={{mr:2}} onClick={() => setOpen(true)}>
          Create Menu
        </Button>
      </Box>
      <Box sx={{display:"flex",flexWrap:"wrap"}}>
        {menus && menus.map((item) => {
          const exit = disabledMenuLocations.find(i=> i.menuId === item.id && i.locationId === Number(localStorage.getItem("selectedlocationId")) )
          const isAvailable = exit ? true: false;
        return <MenuCard key={item.id} menu={item} isAvailable={isAvailable} href={`menus/${item.id}`}/>
        }
        )}
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Box>
  );
};
export default Menus;
