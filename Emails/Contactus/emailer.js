const { contactUs } = require("./EmailSender");


const Emailer= async (req, res) => {
    try {
      const { name,email,phone,message} = req.body
      contactUs({name,email,phone,message})
      res.status(200).json({ msg: "Your message sent successfully" });
    } catch (error) {
      res.status(404).json({ msg: "Error ❌" });
    }
  };
  module.exports=Emailer;