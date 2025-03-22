import express from "express";
import { confirmOrder, createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/confirm", confirmOrder);
module.exports = router;
