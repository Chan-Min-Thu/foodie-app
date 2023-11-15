import ItemCard from "@/components/ItemCard/itemCard";
import NewMenu from "@/components/NewMenu/NewMenu";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { theme } from "@/utlis/theme";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.between("xs","md"))
  const menus = useAppSelector((state) => state.menu.items);
  if(!menus) return null;
  console.log(menus)
  return (
    <Box sx={{width:matches? "100%":"80vw"}}>
      <Box sx={{display:"flex",justifyContent:"flex-end" }}>
        <Button variant="contained" sx={{mr:2}} onClick={() => setOpen(true)}>
          Create Menu
        </Button>
      </Box>
      <Box sx={{display:"flex",flexWrap:"wrap"}}>
        {menus?.map((item) => (
        <ItemCard key={item.id} name={item?.name} icon={<LocalDiningIcon />} href={`menus/${item.id}`}/>
        ))}
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Box>
  );
};
export default Menus;
