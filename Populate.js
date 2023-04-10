const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const connect = require("./db/config");
const dotenv=require('dotenv');
const ProductSchema = require("./models/ProductSchema");
dotenv.config();
const Delete = async () => {
  const Url = process.env.Mongo_Url;
  try {
    await connect(Url)
    // await User.deleteMany();
    // await ProductSchema.deleteMany()
    
    // console.log("deleted users && products");
     await ProductSchema.updateMany({}, { featured: false,isClean:false, secondHand:false }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Updated documents:', res.nModified);
      }
    });
    
  } catch (error) {
    console.error(error);
  }
};

Delete();
