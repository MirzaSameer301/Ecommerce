import express from "express"
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "../controllers/shopAddreddController.js";

const router=express.Router();

router.post('/add',addNewAddress);
router.put('/update/:userId/:addressId',editAddress);
router.get('/get/:userId',fetchAllAddresses);
router.delete('/delete/:userId/:addressId',deleteAddress);

export default router;