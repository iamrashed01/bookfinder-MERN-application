const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createBookValidation = (req) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    tags: Joi.string(),
    description: Joi.string(),
    image: Joi.string().base64(),
    isPublished: Joi.boolean(),
    price: Joi.number().when('isPublished', { is: true, then: Joi.required() }),
  });
  return Schema.validate(req);
};

module.exports = { createBookValidation };
