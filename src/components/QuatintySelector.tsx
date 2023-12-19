import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Typography } from "@mui/material"

interface Props{
    value:number;
    handleIncrease:()=>void;
    handleDecrease:()=>void;
}
const QuantitySelector =({value,handleDecrease,handleIncrease}:Props)=>{
    return(
        <Box sx={{display:"flex",flexDirection:"row" ,mx:"auto",justifyContent:"center",alignItems:"center"}}>
            <AddCircleOutlineIcon sx={{mr:2}} onClick={()=>handleIncrease()}/>
            <Typography sx={{mx:1}}>{value}</Typography>
            <RemoveCircleOutlineIcon sx={{ml:2}} onClick={()=>handleDecrease()}/>
        </Box>
    )
}

export default QuantitySelector;