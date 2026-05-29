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

const validateBrand = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        country: Joi.string().required(),
        founded: Joi.number().required(),
        ceo: Joi.string().required(),
        headquarters: Joi.string().required(),
        website: Joi.string().required(),
        marketValue: Joi.number().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

module.exports = {
    validateItem,
    validateBrand
};
