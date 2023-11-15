import { NextApiRequest,NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utlis/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
      const session = getServerSession(req,res,authOptions);
      if(!session)return res.status(401).send("Unauhtorized.")
      const method = req.method;
      if(method === "POST"){
        const { name,locationId} = req.body;
        console.log("name,locationId",name,locationId)
        const isValid = name && locationId
        console.log("isValid",isValid)
        if(!isValid) return res.status(400).send("Bad request...")
        const table = await prisma.table.create({data:{name,locationId}})
        return res.status(200).json({table})  
      }else if(method === "PUT"){
        const { id ,name,price} = req.body;
        const isValid = id && name 
        // console.log("isValid",isValid)
        if(!isValid) return res.status(400).send("Bad request...")
        const isTable = await prisma.table.findFirst({where:{id}})
        // console.log("isAddon",isAddon)
        if(!isTable) return res.status(400).send("Bad request...")
        const table = await prisma.table.update({data:{name},where:{id}})
        return res.status(200).json({table})
      }else if(method === "DELETE"){
        const tableId =Number(req.query.id)
        const isValid = tableId;
        if(!isValid) return res.status(400).send("Bad request...");
        const isTable = await prisma.table.findFirst({where:{id:tableId}});
        if(!isTable) return res.status(400).send("Bad request...");
        await prisma.table.update({data:{isArchived:true},where:{id:tableId}})
        return res.status(200).send("OK")
      }
      
      res.status(404).send("Method is not allowed.")
}