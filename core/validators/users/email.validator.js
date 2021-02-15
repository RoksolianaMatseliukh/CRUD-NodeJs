const Joi = require('joi');

const { regexpEnum: { EMAIL } } = require('../../constants');

module.exports = Joi.string().trim().pattern(EMAIL).required();
