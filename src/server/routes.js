import express from "express";
import {
  getCart,
  addToCart,
  emptyCart,
  updateQuantity,
  removeFromCart,
} from "./cartController.js";

const router = express.Router();

router.get("/", getCart);


router.post("/", addToCart);


router.delete("/", emptyCart);


router.put("/update", updateQuantity);


router.delete("/:id", removeFromCart);

export default router;
