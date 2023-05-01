const ProductSchema = require("../../models/ProductSchema");
const User = require("../../models/user");

// Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = await ProductSchema.find({ user: deletedUser.email });
    if (products.length === 0) {
      console.log("No products found for user");
    } else {
      
      // Retrieve the product_ids from the images array of all the products
      const productIds = products
        .map((product) => product.image.map((image) => image.product_id))
        .flat();
        
      // Delete the images from Cloudinary
      await cloudinary.api.delete_resources(productIds);
      
      // Delete all the products that are linked to the deleted user
      await ProductSchema.deleteMany({ user: deletedUser.email });
    }

    // Delete the user from the database
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteUser;
