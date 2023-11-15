import { useAppDispatch, useAppSelector } from "@/store/hook";
import { deleteAddonCategory, updateAddonCategory } from "@/store/slice/addonCategorySlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { UpdateAddonCategory } from "@/types/addonCategory";
import { addonCategoryMenu } from "@/types/addonCategoryMenu";
import { theme } from "@/utlis/theme";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { AddOnCategoryMenu, Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCatgoryDetails = () => {
  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const addonCategoryMenus = useAppSelector(
    (state) => state.addonCategoryMenu.items as AddOnCategoryMenu[]);
  const menus = useAppSelector((state) => state.menu.items);

  const dispatch = useAppDispatch();

  const currentAddonCategoryMenu = addonCategoryMenus.filter(
    (item) => item.addOnCategoryId === addonCategoryId && item.isArchived === false
  );
  const menuIds = currentAddonCategoryMenu.map((item) => item.menuId);

  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
//   console.log(addonCategoryId);
  const defaultAddonCategory = {
    id: Number(addonCategoryId),
    name: "",
    menuId: [],
    isRequired: true,
  };
  const [data, setData] = useState<UpdateAddonCategory>(defaultAddonCategory);
  const [open,setOpen] = useState<boolean>(false)

    // useEffect(() => {
    //     setData({
    //     id: addonCategoryId,
    //     name: addonCategory?.name,
    //     menuId: menuIds,
    //     isRequired: addonCategory?.isRequired,
    //   });
    // }, [addonCategory,data]);

  if (!addonCategory || !data) return null;

  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const array = evt.target.value as number[];
    setData({ ...data, id: addonCategoryId, menuId: array });
  };
  const handleUpdateAddonCategory = () => {
    if(!data.name || !data.menuId) return dispatch(snackBarOpen({message:"Error is here that data doesn't complete.",severity:"error",open:true,autoHideDuration:3000}))
    dispatch(
      updateAddonCategory({ ...data, onSuccess: () => {
        router.push("./")
        dispatch(snackBarOpen({  message: "New addon category updated succcessfully.",
        severity: "success",
        open: true,
        autoHideDuration: 3000}))
    } })
    );
  };
  
  const handleDeleteAddonCategory =()=>{
   dispatch(deleteAddonCategory({id:addonCategoryId,onSuccess:()=>{router.push("/backoffice/addon-categories"), dispatch(snackBarOpen({
    message:"This addon-category is successfully deleted.",
    severity: "success",
    open: true,
    autoHideDuration: 3000,
  }))}}))
  
  }

  return (
    <Box sx={{ width: matches ? "100%" : "80vw" }}>
      <Box sx={{width:"100%",display:"flex",justifyContent:"flex-end"}} >
        <Button variant="outlined" color={"error"} onClick={()=>setOpen(true)}>Delete</Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic"
          sx={{ minWidth: 400, mt: 2, mx: 1 }}
          label="Name"
          defaultValue={addonCategory?.name}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        />
        <FormControl sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            defaultValue={menuIds}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Menu" />}
            renderValue={(menuIds) => {
              return menuIds
                .map((id) => {
                  const menu = menus.find((item) => item.id === id) as Menu;
                  return menu;
                })
                .map((item) => <Chip key={item.id} label={item.name} />);
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {menus.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={data.menuId.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          sx={{ m: 1 }}
          required
          onChange={(evt, value) => setData({ ...data, isRequired: value })}
          control={<Checkbox />}
          label="Required"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
              onClick={() =>router.push("/backoffice/addon-categories") }
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!data.name || !data.menuId.length}
            onClick={handleUpdateAddonCategory}
          >
            Comfirm
          </Button>
        </Box>
        <Dialog
        open={open}
        // TransitionComponent={CSSTransition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Comfirm Delete Addon Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this Addon categroy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("backoffice/addon-categories")}>Cancel</Button>
          <Button onClick={handleDeleteAddonCategory}>Comfirm</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Box>
  );
};

export default AddonCatgoryDetails;
