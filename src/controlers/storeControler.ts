import { Request, Response } from "express";
import tshirts from "../model/T-shirtsModel";

export const getProducts = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  if (limit) {
    const limitdata = await tshirts.aggregate([{ $sample: { size: 5 } }]);
    return res.json({ status: "success", data: limitdata });
  }
  if (!page) {
    return res
      .status(400)
      .json({ status: "error", message: "Page number is required" });
  }

  const limitProducts = 10;
  const startIndex = (+page - 1) * limitProducts;
  const products = await tshirts.find({}).skip(startIndex).limit(limitProducts);
  res.json({ status: "success", data: products, page, limit });
};
