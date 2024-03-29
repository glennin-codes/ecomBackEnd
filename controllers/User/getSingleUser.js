const User = require("../../models/user");

// Get single user by ID or email
const getSingleUser = async (req, res) => {
  const idOrEmail = req.params.id;
  try{
    let user;

    // Check if the parameter is a valid email address
    if (/^\S+@\S+\.\S+$/.test(idOrEmail)) {
      user = await User.findOne({ email: idOrEmail });
    } else {
      user = await User.findById(idOrEmail);
    }
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch(error){
    console.error(error);
    res.status(500).json({ message: error.message });

  }
 
};
  
module.exports = getSingleUser;
