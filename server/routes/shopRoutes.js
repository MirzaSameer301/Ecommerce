import express from "express"
import { getFilteredProducts } from "../controllers/shopProductController.js";

const router=express.Router();

router.get('/get',getFilteredProducts);

export default router;