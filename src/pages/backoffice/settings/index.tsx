import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectedLocation } from "@/store/slice/locationSlice";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Settings = () => {
  const locations = useAppSelector((state) => state.location.items);
  const [locationId, setLoactionId] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const selectedLocationId = localStorage.getItem("selectedlocationId");
    if (selectedLocationId) { 
      setLoactionId(String(selectedLocationId));
      const location = locations.find(item=> item.id === Number(selectedLocationId))
      location && dispatch(selectedLocation(location))
    }else{
      const firstLocation = locations[0];
      const firstLocationId = firstLocation?.id;
      localStorage.setItem("selectedlocationId", String(firstLocationId));
      dispatch(selectedLocation(firstLocation))
      return setLoactionId(String(firstLocationId));
    }
  }, [locations,locationId]);
  const handleLocationChange = (evt: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedlocationId", String(evt.target.value));
    setLoactionId(String(evt.target.value))
  };
  if(!locationId) return null;
  return (
    <Box sx={{width:250}}>
      <Typography>Settings Page</Typography>
      <FormControl sx={{mt:2}} fullWidth>
        <InputLabel>Locations</InputLabel>
        <Select
          value={Number(locationId)}
          label="Locations"
          onChange={handleLocationChange}
        >
          {locations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Settings;
