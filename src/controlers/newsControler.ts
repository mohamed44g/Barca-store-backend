import { Request, Response } from "express";
import news from "../model/NewsModel";
import jwt from "jsonwebtoken";
export const getnews = async (req: Request, res: Response) => {
  const news_info = await news.find({}, { _id: true, name: true, img: true });
  res.json({ status: "success", data: news_info });
};

export const getnew = async (req, res) => {
  const new_id = req.params?.id;

  if (!new_id) {
    return res.status(400).json({ status: "error", message: "id is required" });
  }

  const new_info = await news.findOne({ _id: new_id });
  res.json({
    status: "success",
    data: new_info,
    newToken: res?.locals?.authenticated,
  });
};
