const ProductSchema = require("../models/ProductSchema");
const MapCloudinaryImgDataToImgObject = require("../utils/MapCloudinaryImg");

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
      image,
    } = req.body;
    if (image) {
      const promises = [];
      image.forEach(
        async((img) => {
          promises.push(
            cloudinary.uploader.upload(img, {
              folder: "MilesPhotos",
            })
          );
        })
      );

      const response = await Promise.all(promises);
      if (!response) {
        throw new Error("failed to upload to cloudinary");
      }

      const productImageUrls = response.secure_url;
      const publicIds = response.public_id;

      const images = MapCloudinaryImgDataToImgObject(
        productImageUrls,
        publicIds
      );
      await ProductSchema.create({
        name,
        company,
        description,
        category,
        stock,
        stars,
        reviews,
        price,
        image: images,
      });

      return res.status(201).json({ code: 1 });
    }
  } catch (error) {
    return res.status(500).send(`There was an error: ${error.message}`);
   next(error)
  }
};
