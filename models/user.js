const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  student: {
    type: Boolean,
    default: true,
  },
   longitude: {
    type:String,
   
  },
   latitude: {
    type:String,
    
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
