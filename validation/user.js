const Joi = require('joi');

const userValidation = (req) => {
  const Schema = Joi.object({
    name: Joi.string().max(255).required(),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    mobile: Joi.number().required(),
  });
  return Schema.validate(req);
};

module.exports = { userValidation };
