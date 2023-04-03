const ProductSchema = require("../../models/ProductSchema");

const getProductByUser=async (req,res)=>{
    const email = req.params.email;
   try{
    const data= await ProductSchema.find({ user:email});
   
   if (data){
    res.status(200).json(data)
   }
    else{
        res.status(404).json({ message: 'User not found' });
    }

    }catch(error){
       
        console.error(error);
        res.status(500).json({ message: 'server error' });
    
    }
   
   
}
module.exports=getProductByUser;