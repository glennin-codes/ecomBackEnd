const User = require("../../models/user");


// Get all users
const getAllUsers = async (req, res) => {
  
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error ' });
  }
};
module.exports = getAllUsers;