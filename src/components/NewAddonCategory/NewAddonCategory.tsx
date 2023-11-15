import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addAddonCategory, createAddonCategory } from "@/store/slice/addonCategorySlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { CreateAddonCategory } from "@/types/addonCategory";
import { CheckBox } from "@mui/icons-material";
import {
    Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  PaperProps,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NewAddonCategory = ({ open, setOpen }: Props) => {
  const menus = useAppSelector((state) => state.menu.items);
  const dispatch = useAppDispatch();
  const [addonCategory, setAddonCategory] = useState<CreateAddonCategory>({
    name: "",
    menuId: [],
    isRequired:false
  });

  if (!menus) return null;
  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedMenuId = evt.target.value as number[];
    setAddonCategory({ ...addonCategory, menuId: selectedMenuId });
  };
  const handleCreateMenu = ()=>{
       dispatch(createAddonCategory({...addonCategory,onSuccess:()=> {
        setOpen(false)
        dispatch(snackBarOpen({
          message: "New addon category created succcessfully.",
          severity: "success",
          open: true,
          autoHideDuration: 3000
        }))
      }}))
       setAddonCategory({
        name: "",
        menuId: [],
        isRequired:true
      })
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} sx={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
      <DialogTitle>Create Addon Category </DialogTitle>
      <DialogContent sx={{display:"flex",flexDirection:"column"}}>
        <TextField
          sx={{m:2}}
          id="outlined-basic"
          label="Addon Category"
          variant="outlined"
          onChange={(evt) =>
            setAddonCategory({
              ...addonCategory,
              name: evt.target.value as string,
            })
          }
        />
        <FormControl sx={{m:2, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={addonCategory.menuId}
            input={<OutlinedInput label="Tag" />}
            onChange={handleChange}
            renderValue={(menuId) => {
              const names = addonCategory.menuId
                .map((id) => {
                  const selectedMenu = menus.find(
                    (menu) => menu.id === id
                  ) as Menu;
                  return selectedMenu;
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
            {menus?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={addonCategory.menuId.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel sx={{m:2}} required onChange={(evt,value)=>setAddonCategory({...addonCategory,isRequired:value})} control={<Checkbox />} label="Required" />
      </DialogContent>
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
              !addonCategory.name || !addonCategory.menuId.length
            }
            onClick={handleCreateMenu}
          >
            Comfirm
          </Button>
        </DialogContent>
    </Dialog>
  );
};
export default NewAddonCategory;
