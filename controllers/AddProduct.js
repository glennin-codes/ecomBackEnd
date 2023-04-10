const ProductSchema = require("../models/ProductSchema");
const cloudinary = require("../utils/Cloudinary");

const addProducts = async (req, res, next) => {
  try {
    const {
      user,
      name,
      company,
      description,
      category,
      isClean,
      secondHand,
      stock,
      stars,
      reviews,
      price,
      images,
      featured,
       // array of { file: File, color: string } objects
    } = req.body;
    // cloudinary.image("shopify/ntztyuquhj5pu2lhigqn.webp", {height: 310, width: 320, crop: "fit"})
    const promises = images.map(async ({ data, color }) => {
      const { secure_url, public_id } = await cloudinary.uploader.upload(data, {
        folder: 'shopify',
        transformation: [
          { width: 320, height: 300, crop: 'fill', gravity: 'auto', format: 'webp', quality: 'auto', fetch_format: 'auto' },
          {
            width: 50,
            height: 50,
            crop: 'fill',
            gravity: 'auto',
            format: 'webp',
            quality: 'auto',
            fetch_format: 'auto',
            effect: 'brightness:30',
            overlay: { font_family: 'arial', font_size: 32, text: 'Thumbnail' },
            opacity: 50,
          },
        ],
      });
      const thumbnailUrl = secure_url.replace(public_id, `${public_id}_thumbnail`);
      return { color, url: secure_url, public_id, thumbnailUrl };
    });
    console.log(images)
    const imageResponses = await Promise.all(promises);
    
    const imageObjects = imageResponses.map(({ color, url, public_id, thumbnailUrl }) => ({
      filename: public_id,
      url,
      thumbnailUrl,
      product_id: public_id,
      color,
    }));
    
    const product = new ProductSchema({
      user,
      name,
      company,
      description,
      category,
      stock,
      stars,
      reviews,
      featured,
     isClean,
      price,
      secondHand,
      image: imageObjects,
      
      colors: [...new Set(images.map(({ color }) => color))],
    });
    
    await product.save();
    
    return res.status(201).json({ code: 1 });
  } catch (error) {
 
    return res.status(500).send(`There was an error: ${error.message}`);
  
  }
};
module.exports=addProducts
