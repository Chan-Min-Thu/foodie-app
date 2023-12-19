import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slice/addonCategorySlice";
import { deleteAddon, updateAddon } from "@/store/slice/addonSlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { deleteTable, updateTable } from "@/store/slice/tableSlice";
import { UpdateTableOptions } from "@/types/table";
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
import { AddOn, AddOnCategory, Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetails = () => {
  const router = useRouter();
  const tableId = Number(router.query.id);
  const locations = useAppSelector((state) => state.location.items);
  const matches = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const tables = useAppSelector((state) => state.table.items);

  const dispatch = useAppDispatch();

  const table = tables.find((item) => item.id === tableId);

  const [data, setData] = useState<UpdateTableOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (table) {
      setData({
        id: Number(tableId),
        name: table?.name,
      });
    }
  }, [table]);

  if (!table || !data) return null;

  const handleChange = (evt: SelectChangeEvent<number>) => {
    const addonCategoryId = evt.target.value as number;
    setData({ ...data,  });
  };
  const handleUpdateTable = () => {
    if (!data.name)
      return dispatch(
        snackBarOpen({
          message: "Error is here that data doesn't complete.",
          severity: "error",
          open: true,
          autoHideDuration: 3000,
        })
      );
    dispatch(
      updateTable({
        ...data,
        onSuccess: () => {
          router.push("/backoffice/tables");
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

  const handleDeleteTable = () => {
    dispatch(
      deleteTable({
        id: table.id,
        onSuccess: () => {
          router.push("/backoffice/tables"),
            dispatch(
              snackBarOpen({
                message: "This table is successfully deleted.",
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
    <Box sx={{ width: matches ? "100%" : "80vw" }}>
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
          sx={{ minWidth: 400, mt: 2, mx: 1 }}
          label="Name"
          defaultValue={table?.name}
          onChange={(evt) =>
            setData({ id: table.id, name: evt.target.value })
          }
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => router.push("/backoffice/tables")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!data.name}
            onClick={handleUpdateTable}
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
          <DialogTitle>Comfirm Delete table.</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this table?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteTable}>Comfirm</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TableDetails;
