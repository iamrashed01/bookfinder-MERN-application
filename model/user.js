const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  provider: String,
  password: String,
  dob: Date,
  gender: String,
  mobile: Number,
  picture: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    id: this._id,
    email: this.email,
  }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
