const ProductSchema = require("../models/ProductSchema");
const sharp = require('sharp');
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
    } = req.body;

    const promises = images.map(async ({ data, color }) => {
      const compressedImageBuffer = await sharp(data)
        .resize({ width: 320, height: 300, fit: sharp.fit.fill })
        .toBuffer();

      const { secure_url, public_id } = await cloudinary.uploader.upload(compressedImageBuffer, {
        folder: "shopify",
        format: "webp",
        quality: "auto",
        fetch_format: "auto",
      });

      const thumbnailBuffer = await sharp(compressedImageBuffer)
        .resize({ width: 50, height: 50, fit: sharp.fit.cover })
        .blur(0.5)
        .toBuffer();

      const { secure_url: thumbnailUrl } = await cloudinary.uploader.upload(thumbnailBuffer, {
        folder: "shopify",
        format: "webp",
        quality: "auto",
        fetch_format: "auto",
      });

      return { color, url: secure_url, public_id, thumbnailUrl };
    });

    const imageResponses = await Promise.all(promises);

    const imageObjects = imageResponses.map(
      ({ color, url, public_id, thumbnailUrl }) => ({
        filename: public_id,
        url,
        thumbnailUrl,
        product_id: public_id,
        color,
      })
    );

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
    console.error(error);
    return res.status(500).send(`There was an error: ${error.message}`);
  }
};

