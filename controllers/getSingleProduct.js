const mongoose =  require('mongoose')
const ProductSchema = require("../models/ProductSchema");

const getSingleProduct=async(req,res,next)=>{
    // console.log(req.params)

    // const id = req.params.id;
    // const id = req.query
    const id = req.query.id
    console.log(id);

    try {
       
        const product = await ProductSchema.findOne({ _id:id});


        console.log(product)




       res.status(200).send({"data": product})
     

        
    } catch (error) {
        next(error)
    }
}
module.exports = getSingleProduct