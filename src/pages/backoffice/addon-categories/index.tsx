import ItemCard from "@/components/ItemCard/itemCard";
import NewAddonCategory from "@/components/NewAddonCategory/NewAddonCategory";
import ClassIcon from "@mui/icons-material/Class";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react";
import { theme } from "@/utlis/theme";

const AddOnCategories = ()=>{
    const [open,setOpen]= useState(false);
    const matches = useMediaQuery(theme.breakpoints.between("xs","md"))
    const addonCategories = useAppSelector(state=>state.addonCategory.items)
    
    return(
        <Box sx={{width:matches? "100%":"80vw"}}>
            <Box sx={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
                <Button variant="contained" onClick={()=>setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                {addonCategories?.map(item=><ItemCard key={item.id} name={item.name} href={`/backoffice/addon-categories/${item.id}`} icon={<ClassIcon/>}/>)}
            </Box>
            <NewAddonCategory open={open} setOpen={setOpen}/>
        </Box>
    )
}
export default AddOnCategories;