import { useAppDispatch, useAppSelector } from "@/store/hook";
import { config } from "@/utlis/config";
import { fetchAppData } from "@/store/slice/appSlice";
import {
  Box,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import {
  MouseEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import OrderCard from "@/components/OrderCard";
import { formatOrders } from "@/utlis/general/general";
import { OrderItem } from "@/types/order";
import { updateOrder } from "@/store/slice/orderSlice";
import { $Enums, ORDERSTATUS } from "@prisma/client";

const Orders = () => {
  const { data: session } = useSession();
  const orders = useAppSelector((state) => state.order.items);
  const addons = useAppSelector((state) => state.addon.items);
  const menus = useAppSelector((state) => state.menu.items);
  const tables = useAppSelector((state) => state.table.items);
//   const [orderItems, setOrderItems] = useState<OrderItem[]>();
  const [value, setValue] = useState<ORDERSTATUS>(ORDERSTATUS.PENDING);
  const [filteredOrderItems, setFilteredOrderItems] = useState<OrderItem[]>([]);

  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);
  // useEffect(()=>{
  //   if(session && !init){
  //      dispatch(fetchAppData({}))
  //   }
  // },[session])
  
  const hanldeUpdateStatus = (itemId: string, status: ORDERSTATUS) => {
   dispatch(updateOrder({ itemId, status }));
   const filterOrderItems =  formatOrders(orders, addons, menus, tables)?.filter(
    (item) => item.status === status
  );
  setFilteredOrderItems(filterOrderItems)
  };
  console.log(value)
  useEffect(() => {
    if (orders.length) {
      const filterOrderItems =  formatOrders(orders, addons, menus, tables)?.filter(
        (item) => item.status === value
      );
      setFilteredOrderItems(filterOrderItems);
    }
  },[orders,value]);

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "70vw",
        mx:"auto",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          minWidth: "70vw",
          bgcolor: "background.paper",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={(event,value) => {
            setValue(value);
          }}
          aria-label="Platform"
        >
          <ToggleButton value={ORDERSTATUS.PENDING}>
            {ORDERSTATUS.PENDING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COOKING}>
            {ORDERSTATUS.COOKING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COMPLETED}>
            {ORDERSTATUS.COMPLETED}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          minWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        {filteredOrderItems?.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin={true}
              handleUpdateStatus={hanldeUpdateStatus}
            />
          );
        })}
      </Box>
    </Box>
  );
};
export default Orders;
