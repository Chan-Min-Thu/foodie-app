import { CartItems } from "@/types/cart"

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