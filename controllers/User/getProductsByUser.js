const ProductSchema = require("../../models/ProductSchema");

const getProductByUser = async (req, res) => {
  const { email } = req.params;
  try {
    const data = await ProductSchema.find({ user: email });
    if (data.length === 0) {
    
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = getProductByUser;
