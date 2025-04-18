import express from 'express'
import { addProductReview, getProductReviews } from '../controllers/shopProductReview.js';

const router =express.Router();

router.get("/:productId",getProductReviews);
router.post("/add",addProductReview);

export default router;