const Joi = require('joi');

const { regexpEnum: { EMAIL } } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string().trim().pattern(EMAIL).required()
});
