import ItemCard from "@/components/ItemCard/ItemCard";
import NewLocation from "@/components/Location/NewLocaton";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Locations = ()=>{
    const [open,setOpen]= useState(false);
    const locations = useAppSelector(state=>state.location.items)
    return(
        <Box sx={{display:"flex",maxWidth:"75vw" ,flexDirection:"column"}}>
            <Box sx={{display:"flex",justifyContent:"flex-end"}}>
                <Button variant="contained" onClick={()=>setOpen(true)}>Create Location </Button>
            </Box>
            <Box sx={{display:"flex",flexWrap:"wrap"}}>{locations.map(item=><ItemCard key={item.id} name={item.name} icon={<LocationOnIcon/>}/>)}</Box>
            <NewLocation open={open} setOpen={setOpen}/>
        </Box>
    )
}
export default Locations;