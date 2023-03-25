const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
;

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  location: Joi.string().required(),
  school: Joi.string().required(),
  student: Joi.boolean(),
  longitude: Joi.string(),
  latitude: Joi.string(),

});

async function registerUser(req, res) {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const user = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
      phone: value.phone,
      location: value.location,
      school: value.school,
      student: value.student,
      longitude:value.longitude,
      latitude:value.latitude,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerUser };
