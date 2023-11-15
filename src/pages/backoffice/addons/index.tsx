import ItemCard from "@/components/ItemCard/itemCard";
import NewAddon from "@/components/NewAddon/NewAddon";
import NewMenuCategory from "@/components/NewMenuCategory/NewMenuCategory";
import { useAppSelector } from "@/store/hook";
import { theme } from "@/utlis/theme";
import { Box, Button,useMediaQuery } from "@mui/material"
import EggIcon from "@mui/icons-material/Egg";
import { useState } from "react";


const Addons = ()=>{
    const [open,setOpen]= useState(false);
    const matches =useMediaQuery(theme.breakpoints.between("xs","md"))
    const addons = useAppSelector(state=>state.addon.items)
    console.log(addons)
    return(
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
          {addons.map((item) => (
            <ItemCard key={item.id} icon={<EggIcon/>} href={`/backoffice/addons/${item?.id}`} name={item?.name}/>
          ))}
        </Box>
        <NewAddon open={open} setOpen={setOpen} />
      </Box>
    )
}
export default Addons;