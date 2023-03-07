// {*tying to update a single image*}

// const ProductSchema = require("../models/ProductSchema");
// const MapCloudinaryImgDataToImgObject = require("../utils/MapCloudinaryImg");
// const cloudinary = require("../utils/Cloudinary");

// const updateProduct = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       company,
//       description,
//       category,
//       stock,
//       stars,
//       reviews,
//       price,
//       image,
//     } = req.body;

//     const product = await ProductSchema.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Update the product data
//     product.name = name;
//     product.company = company;
//     product.description = description;
//     product.category = category;
//     product.stock = stock;
//     product.stars = stars;
//     product.reviews = reviews;
//     product.price = price;

//     // Update the product images
//     if (image) {
//       const promises = [];
//       const newImages = [];

//       for (let i = 0; i < image.length; i++) {
//         const img = image[i];
//         const imageToUpdate = product.image.find((item) => item._id == img.id);
//         if (imageToUpdate) {
//           promises.push(
//             cloudinary.uploader.destroy(imageToUpdate.public_id, {
//               invalidate: true,
//             })
//           );
//           const result = await cloudinary.uploader.upload(img.data, {
//             folder: "MilesPhotos",
//           });
//           newImages.push({
//             _id: img.id,
//             filename: `Image-${i}.jpeg`,
//             url: result.secure_url,
//             public_id: result.public_id,
//           });
//         } else {
//           const result = await cloudinary.uploader.upload(img.data, {
//             folder: "MilesPhotos",
//           });
//           newImages.push({
//             filename: `Image-${i}.jpeg`,
//             url: result.secure_url,
//             public_id: result.public_id,
//           });
//         }
//       }

//       const response = await Promise.all(promises);
//       product.image = newImages;
//     }

//     await product.save();
//     return res.status(200).json({ code: 1 });
//   } catch (error) {
//     return res.status(500).send(`There was an error: ${error.message}`);
//   }
// };

// module.exports = updateProduct;



const ProductSchema = require("../models/ProductSchema");
const MapCloudinaryImgDataToImgObject = require("../utils/MapCloudinaryImg")
const cloudinary = require("../utils/Cloudinary")
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    
    const {
      name,
      company,
      description,
      category,
      stock,
      stars,
      reviews,
      price,
//       image,
//       colors
    } = req.body;

    const product = await ProductSchema.findOne({ _id:id});
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product data
    product.name = name;
    product.company = company;
//     product.description = description;
    product.category = category;
    product.stock = stock;
//     product.stars = stars;
//     product.reviews = reviews;
    product.price = price;
//     product.colors = colors;

    // Update the product images
//     if (image) {
//       const promises = [];
//       product.image.forEach((img) => {
//         promises.push(
//           cloudinary.uploader.destroy(img.public_id, {
//             invalidate: true,
//           })
//         );
//       });
//       const response = await Promise.all(promises);

//       const newImages = [];
//       const imageUrls = [];
//       const publicIds = [];

//       for (let i = 0; i < image.length; i++) {
//         const img = image[i];
//         const result = await cloudinary.uploader.upload(img, {
//           folder: "MilesPhotos",
//         });
//       newImages.push({
//   filename: `Image-${i}.jpeg`,
//   url: result.secure_url,
//   productId: result.public_id,
// });
//         imageUrls.push(result.secure_url);
//         publicIds.push(result.public_id);
//       }

//       product.image = newImages;
//     }

    await product.save();
    return res.status(200).json({ code: 1 });
  } catch (error) {
    return res.status(500).send(`There was an error: ${error.message}`);
    console.log(error)
  }
};

module.exports = updateProduct;
