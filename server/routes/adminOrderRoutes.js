import express from "express"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "../controllers/adminOrderController.js";
const router=express.Router();

router.get('/get',getAllOrdersForAdmin);
router.get("/details/:id",getOrderDetailsForAdmin);
router.put('/update/:id',updateOrderStatus);

export default router;