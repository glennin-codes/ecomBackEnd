const ProductSchema = require("../../models/ProductSchema");
const User = require("../../models/user");

// Delete user by ID
const deleteUser= async (req, res) => {
    const { id } = req.params;
  
    try {




      const deletedUser = await User.findOne({_id:id});
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      const product = await ProductSchema.findOne({user:deletedUser.email});
      if (!product) {
        return res.status(404).send({msg:"item Not Found"})
      }
          // Retrieve the product_id from the image array
          const productIds = await Promise.all(product.image.map(image => image.product_id));

      
          // Delete the images from Cloudinary
          //you can also choose to delete one using cloudinary.upload.destroy(publicID)
          await cloudinary.api.delete_resources(productIds);
           

      // Delete the user from the database
     await User.deleteOne({ _id: req.params.id });
     
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  module.exports =deleteUser;