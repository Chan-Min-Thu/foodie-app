import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenu } from "@/store/slice/menuSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { CreateMenuOptions } from "@/types/menu";
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
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewMenu = ({ open, setOpen }: Props) => {
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const [newMenu, setNewMenu] = useState<CreateMenuOptions>({
    name: "",
    price: 0,
    menuCategoryId: [],
  });
  const dispatch = useAppDispatch();
  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setNewMenu({ ...newMenu, menuCategoryId: selectedIds });
  };
  // const onSuccess = () => {
  //   setOpen(false);
  // };
  const handleCreateMenu = () => {
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess:()=> {  setOpen(false)
        dispatch(snackBarOpen({
          message: "New Menu created succcessfully.",
          severity: "success",
          open: true,
          autoHideDuration: 3000
        }))
      }})
    );
    setNewMenu({
      name: "",
      price: 0,
      menuCategoryId: [],
    })
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu </DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <TextField
          id="outlined-basic"
          label="Name"
          defaultValue={newMenu.name}
          variant="outlined"
          sx={{ width: 400, mt: 2 }}
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          defaultValue={newMenu.price}
          sx={{ width: 400, mt: 2 }}
          onChange={(evt) =>
            setNewMenu({ ...newMenu, price: Number(evt.target.value) })
          }
        />

        <FormControl sx={{ width: 400, mt: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={newMenu.menuCategoryId}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={() => {
              const names = newMenu.menuCategoryId
                .map((id) => {
                  const selectedMenuCategory = menuCategories.find(
                    (item) => item.id === id
                  ) as MenuCategory;
                  return selectedMenuCategory;
                })
                .map((item) => item.name)
                .join(", ");
              return names;
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
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={newMenu.menuCategoryId.includes(item.id)} />
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
              !newMenu.name || !newMenu.price || !newMenu.menuCategoryId.length
            }
            onClick={handleCreateMenu}
          >
            Comfirm
          </Button>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};
export default NewMenu;
