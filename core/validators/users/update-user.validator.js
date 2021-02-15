const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().trim().min(2).max(25)
        .optional(),
    surname: Joi.string().trim().min(2).max(25)
        .optional(),
    age: Joi.number().integer().greater(17).optional()
});
