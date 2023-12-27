import { useAppSelector } from "@/store/hook";
import { OrderAddon, OrderItem } from "@/types/order";
import { Height } from "@mui/icons-material";
import { Box, Card, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { AddOnCategory, ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleUpdateStatus?:(itemId:string,status:ORDERSTATUS)=>void
}

const OrderCard = ({ orderItem,isAdmin,handleUpdateStatus }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  return (
    <Box sx={{m:2}}>
      <Card
        sx={{
          width: 250,
          height: 300,
          borderRadius: 1,
          px: 1,
          mx:2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: 300 * 0.1, borderBottom: "1px solid lightgray",textAlign:"center",alignItems:"center",my:"auto" }}>
          <Typography sx={{alignItems:"center"}}>ItemId : {orderItem.itemId}</Typography>
        </Box>
        <Box
          sx={{
            height: 300 * 0.55,
            overflow: "scroll",
            scrollbarWidth:"none",
            borderBottom: "1px solid lightgray",
          }}
        >
          {orderItem.orderAddons.map((addon, index) => {
            const addonCategory = addonCategories.find(
              (item) => item.id === addon.addonCategoryId
            ) as AddOnCategory;
            return (
              <Box key={index}>
                <Typography>{addonCategory.name}</Typography>
                {addon.addons.map((item) => {
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        width:200,
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        mb: 2,
                        mx: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: 12,
                          fontStyle: "italic",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.price === 0 ? "" : item.price}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
        <Box sx={{ height: 300 * 0.22 }}>
          {isAdmin ? (
            <Select value={orderItem.status} sx={{my:1}} onChange={(evt: SelectChangeEvent<"PENDING" | "COOKING" | "COMPLETED">)=>handleUpdateStatus(orderItem.itemId,evt.target.value)}>
              <MenuItem sx={{width:"fit-content",}} value={ORDERSTATUS.PENDING}>{ORDERSTATUS.PENDING}</MenuItem>handleUpdateStatus
              <MenuItem sx={{width:"fit-content",}} value={ORDERSTATUS.COOKING}>{ORDERSTATUS.COOKING}</MenuItem>
              <MenuItem sx={{width:"fit-content",}} value={ORDERSTATUS.COMPLETED}>{ORDERSTATUS.COMPLETED}</MenuItem>
            </Select>
          ) : (
            <Typography>Ordet Status : {orderItem.status}</Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};
export default OrderCard;
