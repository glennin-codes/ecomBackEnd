const mongoose =  require('mongoose')
const ProductSchema = require("../models/ProductSchema");

const getSingleProduct=async(req,res,next)=>{
    const {productId }=req.params
    try {
        if(mongoose.Types.ObjectId.isValid(productId)){
        const product = await ProductSchema.findOne({ "_id":productId});

       res.status(200).send({"data": product})
        }

        else{
            res.status(404).send({"message":"product not found"})
        }
    } catch (error) {
        next(error)
    }
}
module.exports = getSingleProduct