const Joi = require('joi');

const { regexpEnum: { PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    password: Joi.string().trim().pattern(PASSWORD).required(),
    confirm_password: Joi.string().trim().pattern(PASSWORD).required()
});
