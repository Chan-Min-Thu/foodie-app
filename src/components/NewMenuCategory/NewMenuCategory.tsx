import { useAppDispatch } from "@/store/hook";
import { createMenuCategory } from "@/store/slice/menuCategorySlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const NewMenuCategory = ({ open, setOpen }: Props) => {
  const [name, setName] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<number>();

  useEffect(() => {
    const locationId = localStorage.getItem("selectedlocationId");
    setSelectedLocationId(Number(locationId));
  }, [selectedLocationId]);

  const dispatch = useAppDispatch();


  const handleCreateMenuCategory = () => {
    dispatch(
      createMenuCategory({
        name,
        locationId: Number(selectedLocationId),
        onSuccess: () => {
          setOpen(false);
          dispatch(
            snackBarOpen({
              message: "New Menu category created succcessfully.",
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
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu Category</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(evt) => setName(evt.target.value)}
          autoFocus
          sx={{ mt: 2 }}
        />
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
          disabled={!name}
          onClick={handleCreateMenuCategory}
        >
          Comfirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default NewMenuCategory;
