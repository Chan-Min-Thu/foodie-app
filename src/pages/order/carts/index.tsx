import { generalTotalPrice } from "@/utlis/general/general";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { emptyCarts, removeCarts } from "@/store/slice/cartSlice";
import { createOrder } from "@/store/slice/orderSlice";
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
import { AddOn, Order } from "@prisma/client";
import { useRouter } from "next/router";

const Carts = () => {
  const carts = useAppSelector((state) => state.carts.items);
  const addons = useAppSelector((state) => state.addon.items);
  const orders = useAppSelector((state) => state.order.items);
  const router = useRouter();
  const cartId = String(router.query.itemId);
  const tableId = Number(router.query.tableId);
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
 
  const handleConfirmOrder = () =>  {
    const isValid = tableId;
    if (!isValid) return alert("Table Id");
    dispatch(
      createOrder({
        tableId,
        cartItems:carts,
        onSuccess: (orders:Order[])=> {
          dispatch(emptyCarts());
          router.push({
            pathname: `/order/active-order/${orders[0].orderSeq}`,
            query: { tableId },
          })
        },
      })
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        mx: "auto",
        mt:{sm:10},
        alignItems: "center",
        flexDirection: "column",
        maxWidth:"100vw*0.5"
      }}
    >
      <Typography variant="h4" sx={{ mx: "auto", fontWeight: 800 }}>
        Review your Order
      </Typography>
      {carts.length > 0 && (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ width:{xs:"100vw *0.8",sm:"50vw"} }} aria-label="simple table">
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
                <TableBody
                  key={item.id}
                  sx={{ borderBottom: "2px solid black", mb: 5 }}
                >
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
                          query: { ...router?.query, itemId: item.id },
                        })
                      }
                    />
                  </Box>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <Box
            sx={{
              my: 3,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Total Price-{generalTotalPrice(carts)}</Typography>
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleConfirmOrder}
            >
              Comfirm Order
            </Button>
          </Box>
        </Box>
      )}{orders.length === 0 &&(
        <Box sx={{ my: 5 }}>
          <Typography>There is not any selected Carts.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Carts;
