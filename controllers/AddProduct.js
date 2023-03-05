const addProducts = async (req, res, next) => {
  try {
    const {
      name,
      company,
      description,
      category,
      stock,
      stars,
      reviews,
      price,
      images, // array of { file: File, color: string } objects
    } = req.body;
    
    const promises = images.map(async ({ data, color }) => {
      const { secure_url, public_id } = await cloudinary.uploader.upload(data, { folder: 'shopify' });
      return { color, url: secure_url, public_id };
    });
    
    const imageResponses = await Promise.all(promises);
    
    const imageObjects = imageResponses.map(({ color, url, public_id }) => ({ filename: public_id, url, product_id: public_id, color }));
    
    const product = new ProductSchema({
      name,
      company,
      description,
      category,
      stock,
      stars,
      reviews,
      price,
      image: imageObjects,
      colors: [...new Set(images.map(({ color }) => color))],
    });
    
    await product.save();
    
    return res.status(201).json({ code: 1 });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`There was an error: ${error.message}`);
  next(error)
  }
};
module.exports=addProducts