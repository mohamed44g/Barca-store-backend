import express from "express";
// const verifyRoutes = require("../middleware/verifyRout");

const router = express();
import {
  registerUser,
  loginUser,
  getProductsCart,
  setProductCart,
  deleteProductCart,
  profile,
  deleteUser,
  logout,
} from "../controlers/userControler";

import { getProducts } from "../controlers/storeControler";
import { getPlayer, getPlayers } from "../controlers/playeControler";
import { getnew, getnews } from "../controlers/newsControler";
import { authenticate } from "../middleware/authenticate";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, profile);
router.delete("/delete", authenticate, deleteUser);
router.post("/logout", authenticate, logout);
router.get("/cart", authenticate, getProductsCart);
router.post("/cart", authenticate, setProductCart);
router.delete("/cart/:id", authenticate, deleteProductCart);
router.delete("/cart", authenticate, deleteProductCart);
router.get("/products", getProducts);
router.get("/player/:id", authenticate, getPlayer);
router.get("/player", getPlayers);
router.get("/news/:id", authenticate, getnew);
router.get("/news", getnews);

export default router;
