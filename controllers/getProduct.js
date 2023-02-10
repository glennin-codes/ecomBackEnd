const Products =require("../models/ProductSchema");
const getProduct=async()=>{
    const {id}=req.params
    try {
        await Products.findById({'_id':id})
       
    } catch (error) {
        next(error)
    }
}