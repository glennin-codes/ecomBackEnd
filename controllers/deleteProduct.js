const ProductSchema = require('../models/ProductSchema');
const cloudinary =require("../utils/Cloudinary")

const deleteProduct = async (req, res, next) => {
  try {
    // Retrieve the product from the database

    const product = await ProductSchema.findOne({ _id: req.params.id });
if (!product) return res.status(404).send({msg:"item with the given id not found!"})
    // Retrieve the product_id from the image array
    const productIds = product.image.map(image => image.product_id);

    // Delete the images from Cloudinary
    //you can also choose to delete one using cloudinary.upload.destroy(publicID)
    await cloudinary.api.delete_resources(productIds);
      await cloudinary.api.delete_resources(productIds)

    // Delete the product from the database
    await ProductSchema.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProduct;