import { NextFunction, Request, Response } from "express";

import { streamUpload } from "../../helpers/cloudinary.helper";

export const uploadSingle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req["file"]) {
    async function upload(req: Request) {
      let result = await streamUpload(req["file"].buffer);
      req.body[req["file"].fieldname] = result["url"];
      next();
    }

    upload(req);
  } else {
    next();
  }
};

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const key in req["files"]) {
    req.body[key] = [];

    const array = req["files"][key];
    for (const item of array) {
      try {
        const result = await streamUpload(item.buffer);
        req.body[key].push(result["url"]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  next();
};
