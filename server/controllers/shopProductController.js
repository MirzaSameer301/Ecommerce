import Product from "../models/Product.js"

export const getFilteredProducts=async(req,res)=>{
    try {
        const productList= await Product.find({});
    res.status(200).json({
        success:true,
        data:productList
    })
    } catch (error) {
        return res.json({
            success:false,
            message:"An Error Occured"
        })
    }
    
}