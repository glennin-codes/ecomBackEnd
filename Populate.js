const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const connect = require("./db/config");
const dotenv=require('dotenv')
dotenv.config();
const Delete = async () => {
  const Url = process.env.Mongo_Url;
  try {
    await connect(Url)
    await User.deleteMany();
    console.log("deleted users ");
  } catch (error) {
    console.error(error);
  }
};

Delete();
