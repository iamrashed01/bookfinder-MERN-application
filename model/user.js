const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  dob: Date,
  gender: String,
  mobile: Number,
  picture: String,
  verificationCode: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
