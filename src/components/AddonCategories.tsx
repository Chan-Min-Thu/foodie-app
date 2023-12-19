import { Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Addons from "./Addons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddOn, AddOnCategory } from "@prisma/client";

interface Props {
  addonCategories: AddOnCategory[];
  selectedAddons: AddOn[];
  setSelectedAddons: Dispatch<SetStateAction<AddOn[]>>
}
const AddonCategories = ({
  addonCategories,
  selectedAddons,
  setSelectedAddons,
}: Props) => {

  return (
    <Box sx={{maxWidth:400,mx:"auto",mt:10}}>
      {addonCategories.map((item) => {
        return (
          <Box key={item.id} sx={{minWidth:300,bgcolor:"#c0d3cf",p:3,borderRadius:4,my:2}}>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Typography sx={{fontWeight:"bold",fontSize:"18px"}}>{item.name}</Typography>
            <Chip label={item.isRequired === true ? "Required":"Optional"}/>
            </Box>
            <Addons addonCategoryId={item.id} selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons}/>
           
          </Box>
        );
      })}
      
    </Box>
  );
};
export default AddonCategories;
