import { NextApiRequest,NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utlis/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
      const session = getServerSession(req,res,authOptions);
      if(!session)return res.status(401).send("Unauhtorized.")
      const method = req.method;
      if(method === "POST"){
        const { name,price,addonCategoryId} = req.body;
        const isValid = name && addonCategoryId
        console.log("isValid",isValid)
        if(!isValid) return res.status(400).send("Bad request...")
        const addon = await prisma.addOn.create({data:{name,price,addOnCategoryId:addonCategoryId}})
        return res.status(200).json({addon})  
      }else if(method === "PUT"){
        const { id ,name,price,addonCategoryId} = req.body;
        const isValid = id && name && addonCategoryId 
        // console.log("isValid",isValid)
        if(!isValid) return res.status(400).send("Bad request...")
        const isAddon = await prisma.addOn.findFirst({where:{id}})
        // console.log("isAddon",isAddon)
        if(!isAddon) return res.status(400).send("Bad request...")
        const addon = await prisma.addOn.update({data:{name,price,addOnCategoryId:addonCategoryId},where:{id}})
        return res.status(200).json({addon})
      }else if(method === "DELETE"){
        const addonId =Number(req.query.id)
        const isValid = addonId;
        if(!isValid) return res.status(400).send("Bad request...");
        const isAddon = await prisma.addOn.findFirst({where:{id:addonId}});
        if(!isAddon) return res.status(400).send("Bad request...");
        await prisma.addOn.update({data:{isArchived:true},where:{id:addonId}})
        return res.status(200).send("OK")
      }
      
      res.status(404).send("Method is not allowed.")
}