import { useAppDispatch, useAppSelector } from "@/store/hook";
import { deleteMenu, updateMenu } from "@/store/slice/menuSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { CreateMenuOptions, UpdateMenuOptions } from "@/types/menu";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { FireExtinguisher } from "@mui/icons-material";
import { config } from "@/utlis/config";

const MenuDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const menuId = router.query.id;
  const menus = useAppSelector((state) => state.menu.items);
  const menuCategories = useAppSelector((state) => state.menuCateogry.items);
  const menuCategoryMenu = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );

  const disabledMenuLocations = useAppSelector(
    (state) => state.disabledMenuLocation.items
  );
  const disabledMenuLocation = disabledMenuLocations.find(
    (i) => i.menuId === Number(menuId)
  );
  const menuCategoryIdFromServer = menuCategoryMenu
    .filter((menu) => menu.menuId === Number(menuId))
    .map((item) => item.menuCategoryId);

  const menu = menus.find((item) => item.id === Number(menuId));
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UpdateMenuOptions>();
  const [menuCategoryId, setMenuCategoryId] = useState<number[]>(
    menuCategoryIdFromServer
  );
  useEffect(() => {
    if (menu) {
      setData({
        id: Number(menuId),
        name: menu?.name,
        price: menu?.price,
        isAvaliable: disabledMenuLocation ? false : true,
        menuCategoryId: menuCategoryIdFromServer,
      });
    }
  }, [menu, disabledMenuLocation]);
  if (!menu || !data) return null;
  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    setMenuCategoryId(evt.target.value as number[]);
  };

  const handleUpdateMenu = () => {
    dispatch(
      updateMenu({
        id: Number(menuId),
        name: data.name,
        price: data.price,
        menuCategoryId,
        isAvaliable: data.isAvaliable,
        locationId: Number(localStorage.getItem("selectedlocationId")),
        onSuccess: () => {
          dispatch(
            snackBarOpen({
              message: "New menu updated succcessfully.",
              severity: "success",
              open: true,
              autoHideDuration: 3000,
            })
          );
        },
      })
    );
    router.push("/backoffice/menus");
  };

  const handleDeleteMenu = () => {
    dispatch(
      deleteMenu({
        id: Number(menuId),
        onSuccess: () => {
          router.push("/backoffice/menus"),
            dispatch(
              snackBarOpen({
                message: "This menu is successfully deleted.",
                severity: "success",
                open: true,
                autoHideDuration: 3000,
              })
            );
        },
      })
    );
  };
  const handleImageUpload =async (event:ChangeEvent<HTMLInputElement>)=>{
    const files = event.target.files
    if(files){
      const file = files[0]
      const formData = new FormData();
      formData.append("files", file);
      const response = await fetch(`${config.apiBaseUrl}/asset`, {
        method: "POST",
        body: formData,
      });
      const { assetUrl } = await response.json();
     assetUrl && dispatch(updateMenu({...data,imgUrl:assetUrl}))

    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          color={"error"}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
          <Image
            width={200}
            height={200}
            style={{
              borderRadius: "50%",
              margin: "0 auto 5px",
              paddingTop: "-200px",
              
            }}
            src={menu?.imgUrl || "/default-menu.png"}
            alt="menu-image"
          />
          <Button variant="contained" component="label" sx={{width:"fit-content"}}>
            Upload
            <input type="file" hidden onChange={handleImageUpload}/>
          </Button>
        </Box>
        <TextField
          id="outlined-basic"
          sx={{ width:{xs:300,sm:400} , mt: 2 }}
          label="Name"
          defaultValue={menu.name}
          onChange={(evt) =>
            setData({ ...data, id: Number(menuId), name: evt.target.value })
          }
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Price"
          sx={{width:{xs:300,sm:400} , mt: 2 }}
          defaultValue={menu.price}
          onChange={(evt) =>
            setData({
              ...data,
              id: Number(menuId),
              price: Number(evt.target.value),
            })
          }
          variant="outlined"
        />
        <FormControl sx={{width:{xs:300,sm:400} , mt: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label" sx={{ minWidth: 400 }}>
            Tag
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            // value={menuCategoryId}
            defaultValue={menuCategoryIdFromServer}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(menuCategoryId) => {
              const names = menuCategoryId
                .map((item) => {
                  const mc = menuCategories.find(
                    (mc) => mc.id === item
                  ) as MenuCategory;
                  return mc;
                })
                .map((item) => item.name)
                .join(", ");
              return names;
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
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={menuCategoryId.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              defaultChecked={data.isAvaliable}
              onChange={(evt, value) =>
                setData({ ...data, isAvaliable: value })
              }
            />
          }
          label="Available"
        />
        <Box sx={{ display: "flex",width:{xs:300,sm:400} , justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => router.push("/backoffice/menus")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!data.name || !data.price || !data.menuCategoryId.length}
            onClick={handleUpdateMenu}
          >
            Update
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        // TransitionComponent={CSSTransition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Comfirm Delete Menu</DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <DialogContentText sx={{ p: 2 }} id="alert-dialog-slide-description">
            Are you sure you want to delete this Menu?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteMenu}>Comfirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default MenuDetails;
