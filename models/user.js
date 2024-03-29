const mongoose = require('mongoose');
const { Schema } = mongoose;
//defining schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    
  },
  school: {
    type: String,
    
  },
  student: {
    type: Boolean,
    default: false,
  },
   longitude: {
    type:String,
   
  },
   latitude: {
    type:String,
    
  },
  verificationCode: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
