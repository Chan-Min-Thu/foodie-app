import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createMenu, setIsLoading } from "@/store/slice/menuSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { CreateMenuOptions } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import { useDropzone } from "react-dropzone";
import NewDropZone from "../FileDropZone";
import FileDropZone from "../FileDropZone";
import { config } from "@/utlis/config";
import { apiBaseUrl } from "next-auth/client/_utils";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/SaveOutlined";

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
  const { isLoading } = useAppSelector((state) => state.menuCateogry);

  const [newMenu, setNewMenu] = useState<CreateMenuOptions>({
    name: "",
    price: 0,
    menuCategoryId: [],
  });

  const [menuImage, setMenuImage] = useState<File>();
  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };
  const dispatch = useAppDispatch();
  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setNewMenu({ ...newMenu, menuCategoryId: selectedIds });
  };
  // const onSuccess = () => {
  //   setOpen(false);
  // };

  const handleCreateMenu = async () => {
    dispatch(setIsLoading(true));
    const newMenuPayload = { ...newMenu };
    if (menuImage) {
      const formData = new FormData();
      formData.append("files", menuImage);
      const response = await fetch(`${config.apiBaseUrl}/asset`, {
        method: "POST",
        body: formData,
      });
      const { assetUrl } = await response.json();
      newMenuPayload.imgUrl = assetUrl;
      dispatch(
        createMenu({
          ...newMenuPayload,
          onSuccess: () => {
            setOpen(false);
            dispatch(setIsLoading(false));
            dispatch(
              snackBarOpen({
                message: "New Menu created succcessfully.",
                severity: "success",
                open: true,
                autoHideDuration: 3000,
              })
            );
            
          },
        })
      );
     
    }
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess: () => {
          setOpen(false);
          dispatch(
            snackBarOpen({
              message: "New Menu created succcessfully.",
              severity: "success",
              open: true,
              autoHideDuration: 3000,
            })
          );
        },
      })
    );
    setNewMenu({
      name: "",
      price: 0,
      menuCategoryId: [],
    });
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
        <Box sx={{ mt: 2 }}>
          <FileDropZone onFileSelected={onFileSelected} />
          {menuImage && (
            <Chip
              sx={{ mt: 2 }}
              label={menuImage.name}
              onDelete={() => setMenuImage(undefined)}
            />
          )}
        </Box>
        <DialogContent sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            disabled={
              !newMenu.name || !newMenu.price || !newMenu.menuCategoryId.length
            }
            onClick={handleCreateMenu}
          >
            Comfirm
          </LoadingButton>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};
export default NewMenu;
