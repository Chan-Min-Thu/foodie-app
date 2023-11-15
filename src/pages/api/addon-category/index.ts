import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utlis/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized.");
  const method = req.method;
  if (method === "POST") {
    const { name, menuId,isRequired=true } = req.body;
    const isValid = name !== undefined && menuId.length > 0;
    if (!isValid) return res.status(400).send("Bad request...");
    const addonCategory = await prisma.addOnCategory.create({ data: { name ,isRequired} });
    const addOnCategoryMenu = await prisma.$transaction(
      menuId.map((id: number) =>
        prisma.addOnCategoryMenu.create({
          data: { addOnCategoryId: addonCategory.id, menuId: id },
        })
      )
    );
    return res.status(200).json({addonCategory,addOnCategoryMenu})
  }else if(method === "PUT"){
    const {id,name,menuId,isRequired = true} = req.body
    const isValid = id && name && menuId.length>0
    // console.log("addonCategory",isValid)
    if(!isValid) return res.status(401).send("Bad request...");
    const addonCategory = await prisma.addOnCategory.update({where:{id},data:{name,isRequired}})
    await prisma.addOnCategoryMenu.deleteMany({where:{addOnCategoryId:id}})
    const UpdateaddonCategoryMenu = menuId.map((itemId :number)=> ({menuId:itemId,addOnCategoryId:id}))
    const addOnCategoryMenu=  await prisma.$transaction(UpdateaddonCategoryMenu.map((item:{menuId:number,addOnCategoryId:number})=> prisma.addOnCategoryMenu.create({data:item})))
    return res.status(200).json({addonCategory,addOnCategoryMenu})
  }else if(method ==="DELETE"){
    const addonCategoryId = Number(req.query.id)
    const isValid = addonCategoryId
    if(!isValid) return res.status(400).send("Bad request.")
    const findAddonCategory = await prisma.addOnCategory.findFirst({where:{id:addonCategoryId}})
    if(!findAddonCategory)return res.status(400).send("Bad request.") 
    await prisma.addOnCategory.update({where:{id:addonCategoryId},data:{isArchived:true}})
    return res.status(200).send("Deleted.")
  }
  res.status(404).send("Method is not allowed")
}
