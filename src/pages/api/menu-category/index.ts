// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utlis/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, locationId } = req.body;
    console.log(name,locationId)
    const isValid = name && locationId !== undefined;
    console.log(isValid)
    if (!isValid) return res.status(400).send("Bad request...");
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!location) return res.status(400).send("Bad request...");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId: location.companyId },
    });
    return res.status(200).json(menuCategory);
  }else if(method === "PUT"){
    const {id,name,isAvailable,locationId} = req.body;
    console.log(isAvailable,locationId)
    const isValid = id && name
    if(!isValid) return res.status(400).send("Bad request...");
    const exit = await prisma.menuCategory.findFirst({where:{id}})
    if(!exit) return res.status(400).send("Bad request...");
    const menuCategory = await prisma.menuCategory.update({data:{name},where:{id}})
    if(locationId && isAvailable === false){
      const exit = await prisma.disabledMenuCategoryLocation.findFirst({where:{menuCategoryId:id}})  
      if(exit) return res.status(400).json({menuCategory,disabledMenuCategoryLocation:exit});
      const disabledMenuCategoryLocation = await prisma.disabledMenuCategoryLocation.create({data:{menuCategoryId:id,locationId}})
      return res.status(200).json({menuCategory,disabledMenuCategoryLocation})
    }else if(locationId && isAvailable === true){
      const exit = await prisma.disabledMenuCategoryLocation.findFirst({where:{menuCategoryId:id}})  
      console.log(exit)
      if(exit){
      const disabledMenuCategoryLocation = await prisma.disabledMenuCategoryLocation.deleteMany({where:{menuCategoryId:id }})
      return res.status(200).json({menuCategory,disabledMenuCategoryLocation})
      
    }
   }else{
    return res.status(200).json(menuCategory)
   }
  }else if(method === "DELETE"){
     const { id } = req.query;
     const  menuCategoryId = Number(id);
     const exit = await prisma.menuCategory.findFirst({where:{id:menuCategoryId}})
     if(!exit) return res.status(400).send("Bad request...")
     if(exit){
      await prisma.menuCategory.update({where:{id:menuCategoryId},data:{isArchived:true}})
      await prisma.menuCategoryMenu.updateMany({where:{menuCategoryId},data:{isArchived:true}})
      return res.status(200).send("OK")
     }
  }
  res.status(404).send("Method is not found...");
}
