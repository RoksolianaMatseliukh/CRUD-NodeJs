const Joi = require('joi');

const { regexpEnum: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string().trim().pattern(EMAIL).required(),
    password: Joi.string().trim().pattern(PASSWORD).required()
});
