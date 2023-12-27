import { CartItems } from "@/types/cart"
import { OrderAddon, OrderItem } from "@/types/order"
import { AddOn, Order } from "@prisma/client"
import { it } from "node:test"

export const genereteRandomIds = ()=>{
    return (Math.random()+1).toString(36).substring(3)
}


export const generalTotalPrice =(carts:CartItems[])=>{
    return carts.reduce((prev,current)=>{
        const menuPrice = current.menu.price;
        const totalAddonPrice = current.addons.reduce((prev,curr) => prev += curr.price,0)
        return  prev += (menuPrice + totalAddonPrice) * current.quantity
    }
    ,0)
}

export const formatOrders = (orders:Order[],addons:AddOn[])=>{
    const orderItemIds:string[]= [];
    orders.forEach(order=>{
        const itemId = order.itemId;
        const exit = orderItemIds.find(orderItemId => orderItemId === order.itemId);
        if(!exit) orderItemIds.push(itemId);
    })
    const orderItems:OrderItem[] = orderItemIds.map(orderItemId => {
        const currentOrders = orders.filter(order=> order.itemId === orderItemId)
        const addonIds = currentOrders.map(item=> item.addOnId)
        let orderAddons:OrderAddon[]=[]
        addonIds.forEach((addonId)=>{
            const addon = addons.find(item=>item.id === addonId) as AddOn;
            const exit = orderAddons.find(item=> item.addonCategoryId === addon?.addOnCategoryId);
            if(exit){
              orderAddons = orderAddons.map(item=> {
                const isSameParent = item.addonCategoryId === addon.addOnCategoryId
               if(isSameParent){
                return {addonCategoryId:item.addonCategoryId,addons:[...item.addons,addon]}   
               }else{
                return item
               }
               })
            }else{
                orderAddons.push({addonCategoryId:addon?.addOnCategoryId,addons:[addon]})
            }
        })
        console.log({itemId:orderItemId,status:currentOrders[0].status,orderAddons})
        return {itemId:orderItemId,status:currentOrders[0].status,orderAddons}
    })
   return orderItems
} 