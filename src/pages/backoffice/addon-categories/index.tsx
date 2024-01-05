import ItemCard from "@/components/ItemCard/ItemCard";
import NewAddonCategory from "@/components/NewAddonCategory/NewAddonCategory";
import ClassIcon from "@mui/icons-material/Class";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { theme } from "@/utlis/theme";

const AddOnCategories = () => {
  const [open, setOpen] = useState(false);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);

  return (
    <Box sx={{ minWidth: "75vw", mx: "auto" }}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap",justifyContent:{xs:"center",sm:"flex-start"} }}>
        {addonCategories?.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            href={`/backoffice/addon-categories/${item.id}`}
            icon={<ClassIcon />}
          />
        ))}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Box>
  );
};
export default AddOnCategories;
