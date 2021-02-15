const Joi = require('joi');

const { regexpEnum: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string().trim().min(2).max(25)
        .required(),
    surname: Joi.string().trim().min(2).max(25)
        .required(),
    age: Joi.number().integer().greater(17).required(),
    email: Joi.string().trim().pattern(EMAIL).required(),
    password: Joi.string().trim().pattern(PASSWORD).required()
});
