import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addAddon, createAddon } from "@/store/slice/addonSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { CreateAddonOption } from "@/types/addon";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { AddOn, AddOnCategory } from "@prisma/client";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const NewAddon = ({ open, setOpen }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  const dispatch = useAppDispatch();
  const [newAddon, setNewAddon] = useState<CreateAddonOption>({
    name: "",
    price: 0,
    addonCategoryId: 0,
  });

  const handleCreateAddon = () => {
    if (!newAddon.name || !newAddon.addonCategoryId)
      return dispatch(
        snackBarOpen({
          message: "Error occured data doesn't complete.",
          severity: "error",
          open: true,
          autoHideDuration: 3000,
        })
      );
      console.log(newAddon)
    setOpen(false)
    dispatch(
      createAddon({
        ...newAddon,
        onSuccess: () =>
          dispatch(
            snackBarOpen({
              message: "New addon created successfully.",
              severity: "success",
              open: true,
              autoHideDuration: 3000,
            })
          ),
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Addon </DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <TextField
          id="outlined-basic"
          label="Name"
          defaultValue={newAddon ? newAddon.name : ""}
          variant="outlined"
          sx={{ width: 400, mt: 2 }}
          onChange={(evt) =>
            setNewAddon({ ...newAddon, name: evt.target.value as string })
          }
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          defaultValue={newAddon ? newAddon.price : 0}
          sx={{ width: 400, mt: 2 }}
          onChange={(evt) =>
            setNewAddon({ ...newAddon, price: Number(evt.target.value) })
          }
        />

        <FormControl sx={{ width: 400, mt: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={newAddon.addonCategoryId}
            onChange={(evt) =>
              setNewAddon({
                ...newAddon,
                addonCategoryId: evt.target.value as number,
              })
            }
            input={<OutlinedInput label="Tag" />}
            renderValue={(selectedAddonCategoryId) => {
              const selectedAddonCategory = addonCategories.find(
                (item) => item.id === newAddon.addonCategoryId
              ) as AddOnCategory;
              return selectedAddonCategory?.name;
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
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DialogContent sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={
              !newAddon.name || !newAddon.addonCategoryId
            }
            onClick={handleCreateAddon}
          >
            Comfirm
          </Button>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};
export default NewAddon;
