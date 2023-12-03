import NewMenuCategory from "@/components/NewMenuCategory/NewMenuCategory";
import { useAppSelector } from "@/store/hook";
import { Box, Button, useMediaQuery } from "@mui/material";
import { Key, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import ItemCard from "@/components/ItemCard/ItemCard";
import { theme } from "@/utlis/theme";

const MenuCategories = () => {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const disabledMenuCategoryLocations = useAppSelector(
    (state) => state.disabledMenuCategoryLocation.items
  );
  if(!menuCategories) return null;
  return (
    <Box sx={{ width: matches ? "100%" : "80vw" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ "&:hover": { bgcolor: "secondary.main" } }}
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategories?.map((item) => {
          const exit = disabledMenuCategoryLocations.find(i => i?.menuCategoryId === item.id && i.locationId === Number(localStorage.getItem("selectedlocationId")) )
          const  isAvailable = exit ? false : true
         return(<ItemCard
            key={item.id}
            icon={<CategoryIcon />}
            href={`menu-categories/${item.id}`}
            isAvailable={isAvailable}
            name={item.name}
          />
        )})}
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};
export default MenuCategories;
