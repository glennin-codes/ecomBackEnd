
const Products=require("../models/ProductSchema")

const addProducts=async()=>{
    const { name,
      company,
      description,
      category,
      stock,
      stars,
      reviews,
      price,
      image}=req.body
    try {


        
     await  Products.create({
        company,
        description,
        category,
        stock,
        stars,
        reviews,
        price,


     })
        
    } catch (error) {
        
    }
}