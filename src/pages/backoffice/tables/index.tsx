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

    const handlePrintTableQrcode=(imgUrl:string)=>{
      const imageWindow = window.open("");
      imageWindow?.document.write(`
      <html><head><title>Image Window</title></head><body style="text-align: center"><img src="${imgUrl}" alt="image Qrcode" onload="window.print();window.close()"/></body></html>`);
      imageWindow?.document.close()
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
            <Button variant="contained" onClick={()=>handlePrintTableQrcode(item.assetUrl)}>
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