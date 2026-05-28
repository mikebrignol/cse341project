const Joi = require('joi');

const validateItem = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        brand: Joi.string().required(),
        price: Joi.number().required(),
        storage: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ 
            error: error.details[0].message
        });
    }

    next();
};

module.exports = {
    validateItem
};