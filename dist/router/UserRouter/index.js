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
} from "../../controlers/userControler/index.js";
import { getProducts } from "../../controlers/storeControler/index.js";
import {
  getPlayer,
  getPlayers,
} from "../../controlers/playeControler/index.js";
import { getnew, getnews } from "../../controlers/newsControler/index.js";
import { authenticate } from "../../middleware/authenticate/index.js";
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
//# sourceMappingURL=UserRouter.js.map
