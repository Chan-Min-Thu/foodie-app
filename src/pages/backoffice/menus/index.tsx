import NewMenu from "@/components/NewMenu/NewMenu";
import MenuCard from "@/components/ItemCard/MenuCard";
import { useAppSelector } from "@/store/hook";
import {
  Box,
  Button
} from "@mui/material";
import { useState } from "react";

const Menus = () => {
  const [open, setOpen] = useState(false);
  const menus = useAppSelector((state) => state.menu.items);
  const disabledMenuLocations = useAppSelector(
    (state) => state.disabledMenuLocation.items
  );
  console.log(menus);
  if (!menus) return null;
  return (
    <Box sx={{ minWidth: "75vw", mx: "auto" }}>
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ bgcolor: "primary.main"}}
      >
        Create
      </Button>
    </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap",justifyContent:{xs:"center",sm:"flex-start"} }}>
        {menus &&
          menus.map((item) => {
            const exit = disabledMenuLocations.find(
              (i) =>
                i.menuId === item.id &&
                i.locationId ===
                  Number(localStorage.getItem("selectedlocationId"))
            );
            const isAvailable = exit ? true : false;
            return (
              <MenuCard
                key={item.id}
                menu={item}
                isAvailable={isAvailable}
                href={`menus/${item.id}`}
              />
            );
          })}
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Box>
  );
};
export default Menus;
