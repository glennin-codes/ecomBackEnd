const User = require("../../models/user");

 const verifyCode=async (req, res) =>{
    try {
      const { email, code } = req.body;
  
      const user = await User.findOne({ email: email, verificationCode: code });
      if (!user) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }
  
      // Mark user as verified
      user.isVerified = true;
      user.verificationCode = null;
      await user.save();
  
      res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  module.exports=verifyCode;