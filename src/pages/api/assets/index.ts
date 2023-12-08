// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Request, Response } from "express";
import { fileUpload } from "../../../utlis/fileUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(req: Request, res: Response) {
  try {
    fileUpload(req, res, (error) => {
      if (error) {
        console.log(error)
        return res.status(500).send("Internal server error.")
    }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.status(200).json({assetUrl});
    });
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
}


