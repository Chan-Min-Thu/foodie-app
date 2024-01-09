import ItemCard from "@/components/ItemCard/ItemCard";
import NewAddonCategory from "@/components/NewAddonCategory/NewAddonCategory";
import ClassIcon from "@mui/icons-material/Class";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { setLoading } from "@/store/slice/addonCategorySlice";
import Loading from "@/components/Loading";

const AddOnCategories = () => {
  const [open, setOpen] = useState(false);
  const [loading,setloading] = useState(true);
  const {items:addonCategories,isLoading} = useAppSelector((state) => state.addonCategory);
  const dispatch = useAppDispatch();
  useEffect(()=>{
     
     if(addonCategories){
        setloading(false)
        dispatch(setLoading(loading))
     };
  },[addonCategories])
  if(loading) return <Loading/>
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
