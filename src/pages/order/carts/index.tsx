import { generalTotalPrice } from "@/general/general";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { removeCarts } from "@/store/slice/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AddOn } from "@prisma/client";
import { useRouter } from "next/router";

const Carts = () => {
  const carts = useAppSelector((state) => state.carts.items);
  const addons = useAppSelector((state) => state.addon.items);
  const { query, ...router } = useRouter();
  const cartId = String(query.itemId);
  const cart = carts.find((item) => item.id === cartId);
  const dispatch = useAppDispatch();
  const renderAddOns = (items: AddOn[]) => {
    return items.map((item) => (
      <Box
        key={item.id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          ml: 5,
        }}
      >
        <Typography align="right" sx={{ fontStyle: "italic" }}>
          {item.name}
        </Typography>
        <Typography align="right" sx={{ fontStyle: "italic" }}>
          {item.price}
        </Typography>
      </Box>
    ));
  };
  //   const handleUpdate=()=>{
  //     router.push({pathname:"order",query:{}})
  //   }
  return (
    <Box
      sx={{
        display: "flex",
        mx: "auto",
        alignItems: "center",
        flexDirection: "column",
        minWidth: 500,
        bgcolor: "#98d1c5",
      }}
    >
      <Typography variant="h4" sx={{ mx: "auto", fontWeight: 800 }}>
        Review your Order
      </Typography>
      {carts.length ? (
        <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 20 }}>Name</TableCell>
                <TableCell sx={{ fontSize: 20 }} align="right">
                  Quantity
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="right">
                  Price
                </TableCell>
              </TableRow>
            </TableHead>

            {carts.map((item) => (
              <TableBody sx={{ borderBottom: "2px solid black", mb: 5 }}>
                <TableRow>
                  <TableCell
                    sx={{ borderBottom: "none" }}
                    component="th"
                    scope="row"
                  >
                    {item.menu.name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="right">
                    {item.quantity}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="right">
                    {item.menu.price}
                  </TableCell>
                </TableRow>
                {renderAddOns(item.addons)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <DeleteIcon
                    sx={{ mr: 3 }}
                    onClick={() => dispatch(removeCarts(item))}
                  />
                  <EditIcon
                    onClick={() =>
                      router.push({
                        pathname: `menu/${item.menu.id}`,
                        query: { ...query, itemId: item.id },
                      })
                    }
                  />
                </Box>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
         <Box sx={{ my: 3 ,display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
         <Typography>Total Price-{generalTotalPrice(carts)}</Typography>
         <Button variant="contained" sx={{ width: "fit-content" }}>
           Comfirm Order
         </Button>
       </Box>
       </Box>
      ) : (
        <Box sx={{my:5}}>
          <Typography>There isn't any selected Carts.</Typography>
        </Box>
      )}

     
    </Box>
  );
};

export default Carts;
