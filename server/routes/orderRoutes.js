import express from "express";
import { confirmOrder, createOrder, getAllOrders, getOrderDetails } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/confirm", confirmOrder);
router.get('/list/:userId',getAllOrders);
router.get('/details/:id',getOrderDetails);
export default router;
