const User = require("./models/user");

const Delete = async () => {
  await User.deleteMany();
  console.log("deleted users ");
};

Delete();
