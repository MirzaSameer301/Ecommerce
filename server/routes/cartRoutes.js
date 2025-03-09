import express from 'express'
import { addToCart, deleteCartItem, fetchCartItems, updateCartQty } from '../controllers/CartController.js';

const router=express.Router();

router.get('/get/:userId',fetchCartItems);
router.post('/add',addToCart);
router.put('/update-cart',updateCartQty);
router.delete('/:userId/:productId',deleteCartItem);

export default router;