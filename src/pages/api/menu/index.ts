// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utlis/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session =await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized...");
  const method = req.method;
  if (method === "POST") {
    const { name, price, menuCategoryId,imgUrl } = req.body;
    const isValid = name && price !== undefined && menuCategoryId.length > 0;
    if (!isValid) return res.status(400).send("Bad request...");
    // const newMenuImgUrl =
    //   "https://media.istockphoto.com/id/1150368709/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%82%E0%B8%B2%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94-confit.jpg?s=1024x1024&w=is&k=20&c=cVSDW5JY8uHc_kRF161aRgRPvXs7k89TEBMcx4-9Q7s=";
    const menu = await prisma.menu.create({
      data: { name, price, imgUrl:imgUrl || "" },
    });
    // console.log("mc", menuCategoryId);
    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryId.map((item: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: item },
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenu });
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryId,isAvaliable,locationId } = req.body;
    // console.log("isAvaliable",isAvaliable)
    const isValid =
      id && name && price !== undefined && menuCategoryId.length > 0;
    // console.log("id",id,"name",name,"price",price)
    if (!isValid) return res.status(400).send("Bad request...");
    const menu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });
    console.log(menu)
    //get menuCategoryMenuArray[]<--  by changing object<--{menuId,menuCategoryId}<-- getting frontend menuCategoryId<--[] data
    const menuCategoryMenuArray = menuCategoryId.map(
      (categoryId:number) => ({
        menuId: menu.id,
        menuCategoryId: categoryId,
      })
    );
    console.log(menuCategoryMenuArray)

    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });
    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryMenuArray.map((item:{menuId:number,menuCategoryId:number}) =>
        prisma.menuCategoryMenu.createMany({
          data: { menuId:item.menuId, menuCategoryId: item.menuCategoryId },
        })
      )
    );
    if(locationId && isAvaliable === false){
      const exit = await prisma.disabledMenuLocation.findFirst({where:{menuId:menu.id}})
      console.log("exit",exit)
      if(exit) return res.status(200).json({disabledMenuLocation:exit,menuCategoryMenu,menu});
      const disabledMenuLocation = await prisma.disabledMenuLocation.create({data:{menuId:menu.id,locationId}})
      return res.status(200).json({disabledMenuLocation,menuCategoryMenu,menu});
    }else if(locationId && isAvaliable === true){
      const exit = await prisma.disabledMenuLocation.findFirst({where:{menuId:menu.id}})
      if(!exit) return res.status(200).json({menuCategoryMenu,menu});
      if(exit) {
        const disabledMenuCategoryLocation = await prisma.disabledMenuLocation.deleteMany({where:{menuId:id,locationId}})
        return res.status(200).json({menuCategoryMenu,menu,disabledMenuCategoryLocation});
      }
    }else{
    return res.status(200).json({ menu, menuCategoryMenu });
    }
  }else if(method === "DELETE"){
    const id =Number(req.query.id);
    const isValid = id as Number ;
    if(!isValid) return res.status(401).send("Bad request...");
    const exit = await prisma.menu.findFirst({where:{id}})
    if(!exit) return res.status(401).send("Bad request...")
    const menu = await prisma.menu.update({data:{isArchived:true},where:{id}})
    await prisma.addOnCategoryMenu.updateMany({data:{isArchived:true},where:{menuId:menu.id}})
    return res.status(200).send("Ok")
  }
  res.status(404).send("Method is not alllowed.");
}
