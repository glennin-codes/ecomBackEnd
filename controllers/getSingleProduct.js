const ProductSchema = require("../models/ProductSchema");
const getSingleProduct=async(req,res,next)=>{
    const {productId}=req.params
    try {
        const product=await ProductSchema.findOne({ "_id":productId})
       res.status(200).send({"data": product})
    } catch (error) {
        next(error)
    }
}
module.exports = getSingleProduct