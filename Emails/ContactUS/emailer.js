const Emailer= async (req, res) => {
    try {
      const { FirstName,LastName,email,number,message} = req.body
      EmailSender({FirstName,LastName,email,number,message})
      res.json({ msg: "Your message sent successfully" });
    } catch (error) {
      res.status(404).json({ msg: "Error ❌" });
    }
  };
  module.exports=Emailer;