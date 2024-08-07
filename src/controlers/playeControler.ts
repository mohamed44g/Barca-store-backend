import { Request, Response } from "express";
import player from "../model/playerModel";
import jwt from "jsonwebtoken";
export const getPlayer = async (req: Request, res: Response) => {
  const player_id = req.params?.id;
  if (!player_id) {
    return res.status(400).json({ status: "error", message: "id is required" });
  }
  const player_info = await player.findOne({ _id: player_id });
  res.json({
    status: "success",
    data: player_info,
    newToken: res?.locals?.authenticated,
  });
};

export const getPlayers = async (req: Request, res: Response) => {
  const players = await player.find({}, { name: true, img: true, _id: true });
  res.json({ status: "success", data: players });
};
