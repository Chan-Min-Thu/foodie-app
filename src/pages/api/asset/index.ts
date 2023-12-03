import { fileUpload } from '@/utlis/fileUpload';
import type { Request, Response } from 'express';

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default function handler(
  req: Request,
  res: Response
) {
    try{ fileUpload(req,res,(err)=>{
    if(err){
        return res.status(500).send("Internal server error occured.");
    }
    const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      return res.status(200).json({ assetUrl });
  })
}catch(err){
    return res.status(500).send("Internal server error...")
  }
}