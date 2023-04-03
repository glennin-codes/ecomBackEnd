const ProductSchema = require("../../models/ProductSchema");

const getProductByUser=async (req,res,next)=>{
    const email = req.params.email;
   try{
    const data= await ProductSchema.find({ user:id});
    res.status(200).json(data)

    }catch(error){
       
        console.error(error);
        res.status(500).json({ message: 'server error' });
    
        next(error)
    }
   
   
}