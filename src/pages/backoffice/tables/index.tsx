import ItemCard from "@/components/ItemCard/ItemCard";
import { useAppSelector } from "@/store/hook";
import { theme } from "@/utlis/theme";
import { Box, Button,useMediaQuery } from "@mui/material"
import TableBarIcon from "@mui/icons-material/TableBar";
import { useState } from "react";
import NewTable from "@/components/NewTable/NewTable";


const Tables = ()=>{
    const [open,setOpen]= useState(false);
    const matches =useMediaQuery(theme.breakpoints.between("xs","md"))
    const tables = useAppSelector(state=>state.table.items)

    const handleQrcodePrint = (assetUrl:string)=>{
      const ImageWindow = window.open("","_blank");
      ImageWindow?.document.write(`<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>s`) 
      ImageWindow?.document.close();
   }
    return(
        <Box sx={{width:matches? "100%":"80vw"}}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {setOpen(true),console.log(open)}}
           
          >
            Create
          </Button>
        </Box>
        <Box sx={{display:"flex",flexWrap:"wrap"}}>
          {tables.map((item) => (
            <Box key={item.id} sx={{display:"flex",flexDirection:"column"}}>
            <ItemCard key={item.id} icon={<TableBarIcon/>} href={`/backoffice/tables/${item?.id}`} name={item?.name}/>
            <Box sx={{display:"flex",justifyContent:"center"}}>
            <Button variant="contained" onClick={()=>handleQrcodePrint(item.assetUrl)}>
              Print
            </Button>
            </Box>
            </Box>
          ))}
        </Box>
        <NewTable open={open} setOpen={setOpen} />
      </Box>
    )
}
export default Tables;