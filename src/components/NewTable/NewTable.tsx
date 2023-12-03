import { useAppDispatch } from "@/store/hook";
import { snackBarClose, snackBarOpen } from "@/store/slice/snackBarSlice";
import { createTable } from "@/store/slice/tableSlice";
import { CreateTableOptions } from "@/types/table";
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
const NewTable = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newTable, setNewTable] = useState<CreateTableOptions>();
  const defalutTable = { name: "",
  locationId: Number(localStorage.getItem("selectedlocationId")),}
  useEffect(() => {
    if (!newTable) {
      setNewTable(defalutTable);
    }
  }, []);
  //   if (!newTable) return null;
  //   const handleCreateTable = () => {
  //     if(!newTable.name) return dispatch(snackBarClose({
  //         message:"Error occoured data doesn't complete.",
  //         severity:"error",
  //         open:true,
  //         autoHideDuration:3000
  //     }))
  //     dispatch(
  //       createTable({
  //         ...newTable,
  //         onSuccess: () => {
  //           dispatch(
  //             snackBarOpen({
  //               message: "New addon created successfully.",
  //               severity: "success",
  //               open: true,
  //               autoHideDuration: 3000,
  //             })
  //           );
  //         },
  //       })
  //     );
  //   };
  //   console.log(open)
  if (!newTable) return null;

  const handleCreateTable = () => {
    if (!newTable?.name)
      return dispatch(
        snackBarOpen({
          message: "Error occoured data doesn't complete.",
          severity: "error",
          open: true,
          autoHideDuration: 3000,
        })
      );
    dispatch(
      createTable({
        ...newTable,
        onSuccess: () => {
          dispatch(
            snackBarOpen({
              message: "New table created successfully.",
              severity: "success",
              open: true,
              autoHideDuration: 3000,
            })
          );
        },
      })
    );
    setNewTable(defalutTable);
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Table </DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <TextField
          id="outlined-basic"
          label="Name"
          value={newTable.name}
          variant="outlined"
          sx={{ width: 400, mt: 2 }}
          onChange={(evt) =>
            setNewTable({ ...newTable, name: evt.target.value as string })
          }
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
          disabled={!newTable?.name}
          onClick={handleCreateTable}
        >
          Comfirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default NewTable;
