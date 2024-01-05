import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setCompany, updateCompany } from "@/store/slice/companySlice";
import { snackBarOpen } from "@/store/slice/snackBarSlice";
import { UpdateCompanyOptions } from "@/types/company";
import { theme } from "@/utlis/theme";
import {
  Box,
  Button,

  SelectChangeEvent,
  TextField
} from "@mui/material"
import { useEffect, useState } from "react";

const Setting = () => {
  const company = useAppSelector((state) => state.company.item);

  const dispatch = useAppDispatch();

  const [data, setData] = useState<UpdateCompanyOptions>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (company) {
      setData({
        id: company.id,
        name: company.name as string,
        street:company.street,
        township:company.township,
        city:company.city
      });
    }
  }, [company]);

  if (!company || !data) return null;

  
  const handleUpdateCompany = () => {
    if (!data)
      return dispatch(
        snackBarOpen({
          message: "Error is here that data doesn't complete.",
          severity: "error",
          open: true,
          autoHideDuration: 3000,
        })
      );
      console.log(data)
    dispatch(updateCompany(data))
  };


  return (
    <Box sx={{ width:"100%"}}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic"
          sx={{ minWidth: {xs:300,sm:400}, mt: 2, mx: 1 }}
          label="Name"
          defaultValue={company?.name}
          onChange={(evt) =>
            setData({...data, name: evt.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          sx={{ minWidth: {xs:300,sm:400}, mt: 2, mx: 1 }}
          label="Street"
          defaultValue={company?.street}
          onChange={(evt) =>
            setData({ ...data, street: evt.target.value })
          }
        />
         <TextField
          id="outlined-basic"
          sx={{ minWidth: {xs:300,sm:400}, mt: 2, mx: 1 }}
          label="Township"
          defaultValue={company?.township}
          onChange={(evt) =>
            setData({ ...data, township: evt.target.value })
          }
        />
         <TextField
          id="outlined-basic"
          sx={{ minWidth: {xs:300,sm:400}, mt: 2, mx: 1 }}
          label="City"
          defaultValue={company?.city}
          onChange={(evt) =>
            setData({ ...data, city: evt.target.value })
          }
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!data.name}
            onClick={handleUpdateCompany}
          >
            Comfirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Setting;
