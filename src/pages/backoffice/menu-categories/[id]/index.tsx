import { useAppDispatch, useAppSelector } from "@/store/hook";
import { updateMenuCategory } from "@/store/slice/menuCategorySlice";
import { updateMenu } from "@/store/slice/menuSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuCategoryName,setMenuCategoryName] =useState<string>("") 
  const dispatch = useAppDispatch();

  const menuCategoryId = router.query.id;
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
  
  
  // useEffect(()=>{
  //   setMenuCategoryName(menuCategory?.name);
  // },[menuCategory,menuCategoryName])
  
  if (!menuCategory) return null;
  const handleUpdateMenuCategory =()=>{ 
    dispatch(updateMenuCategory({id:Number(menuCategoryId),name:menuCategoryName,onSuccess:()=>{
      router.push("./")
      dispatch(snackBarOpen({  message: "New menu category updated succcessfully.",
        severity: "success",
        open: true,
        autoHideDuration: 3000}))
    }}))

 }
 const handleDeleteMenuCategory  =()=>{}
  return (
    <Box
      sx={{
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        m: "auto",
      }}
    >
  
        <Box sx={{ display: "flex", justifyContent: "flex-end",my:2 ,width:"100%"}}>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            color={"error"}
          >
            Delete
          </Button>
        </Box>
        <TextField defaultValue={menuCategory.name} onChange={(evt)=>setMenuCategoryName(evt.target.value)}/>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => router.push("/backoffice/menu-categories")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!menuCategory.name}
            onClick={handleUpdateMenuCategory}
          >
            Update
          </Button>
        </Box>
      <Dialog
        open={open}
        // TransitionComponent={CSSTransition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Comfirm Delete Menu Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this Menu-categroy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteMenuCategory}>Comfirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default MenuCategoryDetails;
