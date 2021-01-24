const _ = require('lodash');
const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('../model/user');
const sendMail = require('../services/sendMail');
const { createUserValidation } = require('../validation/auth');

const localRegister = async (req, res) => {
  const { error } = createUserValidation(req.body);
  if (error) {
    // remove profile image while got error
    await fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: error.details[0].message, success: false });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    // remove profile image while got error
    await fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: 'user already registered!', success: false });
  }

  const code = Math.floor(100000 + Math.random() * 900000);
  const to = req.body.email;
  const salt = await bcrypt.genSalt(10);

  user = await new User(_.pick(req.body, ['name', 'email', 'password', 'dob', 'gender', 'mobile']));
  user.picture = req.file.path;
  // sendMail(to, code);
  user.verificationCode = await bcrypt.hash(code.toString(), salt);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return res.status(201).json({
    data: _.pick(user, ['name', 'email', 'dob', 'gender', 'mobile', 'picture']),
    message: 'Please check your email and verify your account',
    success: true,
  });
};

module.exports = { localRegister };
