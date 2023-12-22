import { generalTotalPrice } from '@/general/general';
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
   const isValid = tableId && cartItems.length
   if(!isValid) return  res.status(400).send("Bad request");
   const orderSeq = nanoid(); 
   for(const cart of cartItems){
    const cartItem = cart as CartItems
    const hasAddon = cartItem.addons.length
    if(hasAddon){
        for( const addon of cartItem.addons){
            await prisma.order.create({data:{
                tableId:Number(tableId),
                menuId:cartItem.menu.id,
                orderSeq,
                addOnId:addon.id,
                status:ORDERSTATUS.PENDING,
                totalPrice:generalTotalPrice(cartItems),
                quantity:cartItem.quantity
               }})
            // console.log(addon)
        }
    }else{
       await prisma.order.create({data:{
        tableId:Number(tableId),
        menuId:cartItem.menu.id,
        orderSeq,
        status:ORDERSTATUS.PENDING,
        totalPrice:generalTotalPrice(cartItems),
        quantity:cartItem.quantity
       }})
    }
   }
   const orders = await prisma.order.findMany({where:{orderSeq}})
   return res.status(200).json({orders})
  }
 return res.status(404).send("Method is not allowed")
}
