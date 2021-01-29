const fs = require('fs');
const _ = require('lodash');
const User = require('../model/user');
const { userValidation } = require('../validation/user');

const getProfileController = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).select('-_id -__v -password');
  if (!user) {
    return res.status(401).json({ auth_status: 'out', message: 'Acess Denied', success: false });
  }

  return res.status(200).json({
    data: user, auth_status: 'in', message: 'successfully retrieved user data', success: true,
  });
};

const updateProfileController = async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Please provide profile image' });
  }

  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(401).json({ auth_status: 'out', message: 'Acess Denied', success: false });
  }

  try {
    fs.unlinkSync(user.picture);
    console.log('file removed successfuly');
  } catch (error) {
    console.log(error.message);
  }

  const {
    name, gender, mobile, dob,
  } = req.body;

  user.name = name;
  user.gender = gender;
  user.mobile = mobile;
  user.dob = dob;
  user.picture = req.file.path;

  await user.save();

  return res.status(200).json({
    data: user, auth_status: 'in', message: 'successfully updated user info', success: true,
  });
};

module.exports = { getProfileController, updateProfileController };
