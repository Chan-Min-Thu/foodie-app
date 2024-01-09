import OrderAppHeader from '@/components/OrderAppHeader';
import { generalTotalPrice } from '@/utlis/general/general';
import { CartItems } from '@/types/cart';
import { prisma } from '@/utlis/db';
import { ORDERSTATUS } from '@prisma/client';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if(method === "POST"){
   const {tableId,cartItems} = req.body;
   const isValid = tableId && cartItems.length;
   const isOrder = await prisma.order.findFirst({where:{tableId,status:ORDERSTATUS.PENDING || ORDERSTATUS.COOKING}})
   const totalPrice = isOrder ? isOrder?.totalPrice + generalTotalPrice(cartItems):generalTotalPrice(cartItems)
   const orderSeq = isOrder ? isOrder?.orderSeq : nanoid(); 
   for(const cart of cartItems){
    const cartItem = cart as CartItems
    const hasAddon = cartItem.addons.length
    if(hasAddon){
        for( const addon of cartItem.addons){
            await prisma.order.create({data:{
                tableId:Number(tableId),
                menuId:cartItem.menu.id,
                orderSeq,
                itemId:cartItem.id,
                addOnId:addon.id,
                status:ORDERSTATUS.PENDING,
                totalPrice,
                quantity:cartItem.quantity
               }})
        }
    }else{
       await prisma.order.create({data:{
        tableId:Number(tableId),
        menuId:cartItem.menu.id,
        orderSeq,
        itemId:cartItem.id,
        status:ORDERSTATUS.PENDING,
        totalPrice,
        quantity:cartItem.quantity
       }})
    }
   }
   await prisma.order.updateMany({data:{totalPrice},where:{orderSeq}})
   const orders = await prisma.order.findMany({where:{orderSeq}})
   return res.status(200).json({orders})
  }else if(method === "GET"){
    const orderSeq = req.query.orderSeq;
    if(!orderSeq) return res.status(400).send("Bad request.");
    const orders = await prisma.order.findMany({where:{orderSeq:String(orderSeq)}})
    return res.status(200).json({orders})
  }else if(method === "PUT"){
    const {itemId} = req.query;
    const {status} =req.body;
    const isValid = itemId && status;
    if(!isValid) return res.status(400).send("Bad request.");
    const isOrderItem = await prisma.order.findFirst({where:{itemId:String(itemId)}})
    if(!isOrderItem) return res.status(400).send("Bad request.");
    await prisma.order.updateMany({data:{status:status as ORDERSTATUS},where:{itemId:String(itemId)}})
    const table = await prisma.table.findFirst({where:{id:isOrderItem.tableId}});
    const location = await prisma.location.findFirst({where:{id:table?.locationId}});
    const tableIds = (await prisma.table.findMany({where:{locationId:location?.id}})).map(item=>item.id);
    console.log(tableIds)
    const orders = await prisma.order.findMany({where:{tableId:{in:tableIds}},orderBy:{id:"asc"}})
    console.log(orders)
    return res.status(200).json({orders})
  }
 return res.status(404).send("Method is not allowed")
}
