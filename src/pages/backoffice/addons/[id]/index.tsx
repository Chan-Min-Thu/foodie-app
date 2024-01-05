import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slice/addonCategorySlice";
import { deleteAddon, updateAddon } from "@/store/slice/addonSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { UpdateAddonOption } from "@/types/addon";
import { UpdateAddonCategory } from "@/types/addonCategory";
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

} from "@mui/material";
import { AddOn, AddOnCategory, Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetails = () => {
  const router = useRouter();
  const addonId = Number(router.query.id);
  const addonCategories = useAppSelector((state) => state.addonCategory.items);

  const addons = useAppSelector((state) => state.addon.items);

  const dispatch = useAppDispatch();

  const addon = addons.find((item) => item.id === addonId);

  const [data, setData] = useState<UpdateAddonOption>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (addon) {
      setData({
        id: Number(addonId),
        name: addon?.name,
        price: addon?.price,
        addonCategoryId: addon?.addOnCategoryId,
      });
    }
  }, [addon]);

  if (!addon || !data) return null;

  const handleChange = (evt: SelectChangeEvent<number>) => {
    const addonCategoryId = evt.target.value as number;
    setData({ ...data, addonCategoryId });
  };
  const handleUpdateAddon = () => {
    if (!data.name || !data.addonCategoryId)
      return dispatch(
        snackBarOpen({
          message: "Error is here that data doesn't complete.",
          severity: "error",
          open: true,
          autoHideDuration: 3000,
        })
      );
    dispatch(
      updateAddon({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/addons");
          dispatch(
            snackBarOpen({
              message: "New addon category updated succcessfully.",
              severity: "success",
              open: true,
              autoHideDuration: 3000,
            })
          );
        },
      })
    );
  };

  const handleDeleteAddon = () => {
    dispatch(
      deleteAddon({
        id: addon.id,
        onSuccess: () => {
          router.push("/backoffice/addons"),
            dispatch(
              snackBarOpen({
                message: "This addon is successfully deleted.",
                severity: "success",
                open: true,
                autoHideDuration: 3000,
              })
            );
        },
      })
    );
  };

  return (
    <Box sx={{ width:"100%" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color={"error"}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic"
          sx={{ width:{xs:250,sm:400} , mt: 2, mx: 1 }}
          label="Name"
          defaultValue={addon?.name}
          onChange={(evt) =>
            setData({ ...data, id: addon.id, name: evt.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          sx={{ width:{xs:250,sm:400} , mt: 2, mx: 1 }}
          label="Price"
          defaultValue={addon?.price}
          onChange={(evt) =>
            setData({ ...data, id: addon.id, price: Number(evt.target.value) })
          }
        />
        <FormControl sx={{ mt: 2, mx: 1, width:{xs:250,sm:400}  }}>
          <InputLabel id="demo-multiple-chip-label">Addon Category</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            defaultValue={data?.addonCategoryId ? data?.addonCategoryId : 0}
            onChange={handleChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Addon Category" />
            }
            renderValue={(selectedAddonId) => {
              return (
                addonCategories.find(
                  (item) => item.id === selectedAddonId
                ) as AddOnCategory
              ).name;
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 300,
                },
              },
            }}
          >
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => router.push("/backoffice/addons")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!data.name || !data.addonCategoryId}
            onClick={handleUpdateAddon}
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
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteAddon}>Comfirm</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AddonDetails;
