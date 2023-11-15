import NewMenuCategory from "@/components/NewMenuCategory/NewMenuCategory";
import { useAppSelector } from "@/store/hook";
import { Box, Button, useMediaQuery } from "@mui/material";
import { Key, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import ItemCard from "@/components/ItemCard/itemCard";
import { theme } from "@/utlis/theme";

const MenuCategories = () => {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.between("xs","md"))
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  return (
    <Box sx={{width:matches? "100%":"80vw"}}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ "&:hover": { bgcolor: "secondary.main" } }}
        >
          Create
        </Button>
      </Box>
      <Box sx={{display:"flex",flexWrap:"wrap"}}>
        {menuCategories.map((item) => (
          <ItemCard key={item.id} icon={<CategoryIcon/>} href={`/backoffice/menu-categories/${item.id}`} name={item.name}/>
        ))}
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};
export default MenuCategories;
