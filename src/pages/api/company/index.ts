// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/utlis/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if(session){
        const method= req.method
        if(method === "PUT"){
        const {id,name,street,township,city} = req.body;
        const isValid = id && name && street && township && city
        if(!isValid) return res.status(400).send("Bad request.")
        const company = await prisma.company.update({where:{id},data:{name,street,township,city}});
        return res.status(200).json({company})
        }
        return res.status(404).send("Method is not found")
    }
 
}
