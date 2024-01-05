import ItemCard from "@/components/ItemCard/ItemCard";
import NewAddon from "@/components/NewAddon/NewAddon";
import NewMenuCategory from "@/components/NewMenuCategory/NewMenuCategory";
import { useAppSelector } from "@/store/hook";
import { theme } from "@/utlis/theme";
import { Box, Button } from "@mui/material";
import EggIcon from "@mui/icons-material/Egg";
import { useState } from "react";

const Addons = () => {
  const [open, setOpen] = useState(false);
  const addons = useAppSelector((state) => state.addon.items);
  return (
    <Box sx={{ minWidth: "75vw", mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "primary.main" }}
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap",justifyContent:{xs:"center",sm:"flex-start"} }}>
        {addons.map((item) => (
          <ItemCard
            key={item.id}
            icon={<EggIcon />}
            href={`/backoffice/addons/${item?.id}`}
            name={item?.name}
          />
        ))}
      </Box>
      <NewAddon open={open} setOpen={setOpen} />
    </Box>
  );
};
export default Addons;
