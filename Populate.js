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
    await ProductSchema.deleteOne({ _id: "642fd1d33952e85efd61038e" });
    await ProductSchema.deleteOne({ _id: "642fd2bd3952e85efd6103ae" });
    console.log("deleted users && products");
  } catch (error) {
    console.error(error);
  }
};

Delete();
