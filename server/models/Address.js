import mongoose from 'mongoose'

const addressSchema=new mongoose.Schema({
    userId:String,
    address:String,
    city:String,
    pincode:String,
    phone:String,
    notes:String,
},{timestamps:true})

const Address=mongoose.model("address",addressSchema)
export default Address;