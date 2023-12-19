import { useAppDispatch, useAppSelector } from "@/store/hook";
import { menuCategoryMenuSlice } from "@/store/slice/menuCategoryMenuSlice";
import {
  deleteMenuCatagory,
  updateMenuCategory,
} from "@/store/slice/menuCategorySlice";
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
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [menuCategory, setMenuCategory] = useState<UpdateMenuCategoryOptions>();
  const dispatch = useAppDispatch();

  const currentMenuCategoryId = router.query.id;
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const disabledMenuCategoryLocations = useAppSelector((state)=>state.disabledMenuCategoryLocation.items)
  const curentDisabledMCL = disabledMenuCategoryLocations.find(item=>item?.menuCategoryId === Number(currentMenuCategoryId))
  const currentmenuCategory = menuCategories.find(
    (item) => item.id === Number(currentMenuCategoryId)
  );

  useEffect(() => {
    if (currentmenuCategory) {
      const defaultMenuCategory = {
        id: Number(currentMenuCategoryId),
        name: currentmenuCategory.name,
        isAvailable:curentDisabledMCL ? false :true ,
      };
      setMenuCategory(defaultMenuCategory);
    }
  }, [menuCategories,disabledMenuCategoryLocations]);

  if (!menuCategory) return null;
  const handleUpdateMenuCategory = () => {
    
    dispatch(
      updateMenuCategory({
        id: Number(currentMenuCategoryId),
        name: menuCategory.name,
        isAvailable: menuCategory.isAvailable,
        locationId: Number(localStorage.getItem("selectedlocationId")),
        onSuccess: () => {
          dispatch(
            snackBarOpen({
              message: "New menu category updated succcessfully.",
              severity: "success",
              open: true,
              autoHideDuration: 3000,
            })
          );
        },
      })
    );
    router.push("/backoffice/menu-categories");
  };
  const handleDeleteMenuCategory = () => {
    dispatch(
      deleteMenuCatagory({
        id: menuCategory.id,
        onSuccess: () => {
          router.push("/backoffice/menu-categories");
        },
      })
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection:"column",
        m: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          my: 2,
          flexDirection:"column"
        }}>
          < Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          my: 2,
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          color={"error"}
        >
          Delete
        </Button>
      </Box>
      <TextField
        defaultValue={menuCategory.name}
        onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })} />
      <FormControlLabel
        control={
        <Switch
        defaultChecked={menuCategory?.isAvailable}
        onChange={(evt, value) => setMenuCategory({...menuCategory,isAvailable:value})} />
       }
        label="Available" />
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
        <DialogTitle>Comfirm Delete MenuCategory</DialogTitle>
        <DialogContent sx={{p:2}}>
          <DialogContentText sx={{p:2}} id="alert-dialog-slide-description">
            Are you sure you want to delete this Menu Category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteMenuCategory}>Comfirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};
export default MenuCategoryDetails;