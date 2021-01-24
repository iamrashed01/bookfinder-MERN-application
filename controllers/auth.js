const _ = require('lodash');
const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('../model/user');
const sendMail = require('../services/sendMail');
const { createUserValidation, loginUserValidation } = require('../validation/auth');

const localRegister = async (req, res) => {
  const { error } = createUserValidation(req.body);
  if (error) {
    if (req.body.picture) {
      await fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ message: error.details[0].message, success: false });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    if (req.body.picture) {
      await fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ message: 'user already registered!', success: false });
  }

  const code = Math.floor(100000 + Math.random() * 900000);
  const to = req.body.email;
  const salt = await bcrypt.genSalt(10);

  user = await new User(_.pick(req.body, ['name', 'email', 'password', 'dob', 'gender', 'mobile']));
  user.picture = req.file.path;
  sendMail(to, code);
  user.verificationCode = await bcrypt.hash(code.toString(), salt);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  return res.status(201).json({
    token,
    data: _.pick(user, ['name', 'email', 'dob', 'gender', 'mobile', 'picture']),
    message: 'Please check your email and verify your account',
    success: true,
  });
};

const localLogin = async (req, res) => {
  const { error } = loginUserValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message, success: false });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      message: 'username or password are wrong',
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      message: 'username or password are wrong',
    });
  }

  const token = user.generateAuthToken();
  return res.status(200).json({
    data: {
      userInfo: _.pick(user, ['name', 'email', 'dob', 'gender', 'picutre', 'mobile']),
    },
    token,
    message: 'user loged in successfully',
  });
};

const accountVerify = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ message: 'Please provide verification code', success: false });
  }

  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    return res.status(401).json({ message: 'Access denied', success: false });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: 'Already verified!', success: false });
  }

  const isValid = await bcrypt.compare(code.toString(), user.verificationCode);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid verification Code', success: false });
  }
  user.isVerified = true;
  user.verificationCode = '';
  await user.save();

  const token = await user.generateAuthToken();

  return res.status(200).json({ token, message: 'User verified Successfully', success: true });
};

module.exports = { localRegister, accountVerify, localLogin };
