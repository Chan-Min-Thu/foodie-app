import { useAppSelector } from "@/store/hook";
import { OrderItem } from "@/types/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { AddOnCategory, ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleUpdateStatus?:(itemId:string,status:ORDERSTATUS)=>void
}

const OrderCard = ({ orderItem,isAdmin,handleUpdateStatus }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCategory.items);
  if(!addonCategories && !orderItem) return null;
  
  return (
    <Box sx={{m:2}}>
      <Card
        sx={{
          width: 300,
          height: 300,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{bgcolor:"#4C4C6D",display:"flex",justifyContent:"space-between",p:1,color:"white"}}>
          <Typography>{orderItem?.menu?.name}</Typography>
          <Typography>{orderItem?.table?.name}</Typography>
        </Box>
        <Box sx={{ height: 300 * 0.1,p:1, borderBottom: "1px solid lightgray",display:"flex",justifyContent:"space-between",alignItems:"center",my:"auto" }}>
        <Typography>ItemId : </Typography>  <Typography sx={{alignItems:"center"}}>{orderItem.itemId}</Typography>
        </Box>
        <Box
          sx={{
            height: 300 * 0.6,
            py:1,
            overflow: "scroll",
            borderBottom: "1px solid lightgray",
          }}
        >
          {orderItem.orderAddons.map((addon, index) => {
            const addonCategory = addonCategories.find(
              (item) => item?.id === addon?.addonCategoryId
            ) as AddOnCategory;

            return (
              <Box key={index}>
                <Typography>{addonCategory?.name}</Typography>
                {addon.addons.map((item) => {
                  return (
                    <Box
                      key={item?.id}
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
                        {item?.name}
                      </Typography>
                      <Typography>
                        {item?.price === 0 ? "" : item?.price}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
        <Box sx={{width:300,px:1, height: 300 * 0.22 ,display:"flex",justifyItems:"space-between",alignItems:"center"}}><Typography> Order Status :</Typography>
          {isAdmin ? (
            <Select value={orderItem.status} sx={{width:"fit-content"}} onChange={(evt)=>handleUpdateStatus && handleUpdateStatus(orderItem.itemId,evt.target.value as ORDERSTATUS)}>
              <MenuItem sx={{width:"fit-content",}} value={ORDERSTATUS.PENDING}>{ORDERSTATUS.PENDING}</MenuItem>
              <MenuItem sx={{width:"fit-content",}} value={ORDERSTATUS.COOKING}>{ORDERSTATUS.COOKING}</MenuItem>
              <MenuItem sx={{width:"fit-content",}} value={ORDERSTATUS.COMPLETED}>{ORDERSTATUS.COMPLETED}</MenuItem>
            </Select>
          ) : (
            <Typography>{orderItem?.status}</Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};
export default OrderCard;
