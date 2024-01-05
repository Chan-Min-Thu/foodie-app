import ItemCard from "@/components/ItemCard/ItemCard";
import NewLocation from "@/components/Location/NewLocaton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { setSelectedLocation } from "@/store/slice/locationSlice";

const Locations = () => {
  const [open, setOpen] = useState(false);
  const { items, selectedLocation } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "75vw",
        mx: "auto",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap",justifyContent:{xs:"center",sm:"flex-start"} }}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            name={item.township}
            selected={item.id === selectedLocation?.id}
            onClick={() => dispatch(setSelectedLocation(item))}
            icon={<LocationOnIcon />}
          />
        ))}
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Box>
  );
};
export default Locations;
