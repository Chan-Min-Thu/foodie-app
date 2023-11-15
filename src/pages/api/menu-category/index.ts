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
    const {id,name} = req.body;
    const isValid = id && name
    if(!isValid) return res.status(401).send("Bad request...");
    const menuCategory = await prisma.menuCategory.update({data:{name},where:{id}})
    return res.status(200).json(menuCategory)
  }
  res.status(404).send("Method is not found...");
}
