const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .collection('brands')
            .find();

        const brands = await result.toArray();

        res.status(200).json(brands);

    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve brands.' });
    }

};

const getSingle = async (req, res) => {
    const brandId = new ObjectId(req.params.id);

    try {
        const result = await mongodb
            .getDb()
            .collection('brands')
            .find({ _id: brandId });

    const brand = await result.toArray();

        res.status(200).json(brand[0]);

    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve brand.' });
    }
};

const createBrand = async (req, res) => {
    try {
        const brand = {
            name: req.body.name,
            country: req.body.country,
            founded: req.body.founded,
            ceo: req.body.ceo,
            headquarters: req.body.headquarters,
        website: req.body.website,
        marketValue: req.body.marketValue
    };

    const response = await mongodb
        .getDb()
        .collection('brands')
        .insertOne(brand);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json({ message: 'Failed to create brand.' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Database Error.', error: error.message }); 
    }
};

const updateBrand = async (req, res) => {
    try { const brandId = new ObjectId(req.params.id);

    const brand = {
        name: req.body.name,
        country: req.body.country,
        founded: req.body.founded,
        ceo: req.body.ceo,
        headquarters: req.body.headquarters,
        website: req.body.website,
        marketValue: req.body.marketValue
    };

    const response = await mongodb
        .getDb()
        .collection('brands')
        .replaceOne({ _id: brandId }, brand);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ message: 'Failed to update brand.' });
    }} catch (error) {
        res.status(500).json({ message: 'Database Error.', error: error.message });
    }
        
};

const deleteBrand = async (req, res) => {
    try { const brandId = new ObjectId(req.params.id);

    const response = await mongodb
        .getDb()
        .collection('brands')
        .deleteOne({ _id: brandId });

    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json({ message: 'Failed to delete brand.' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Database Error.', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createBrand,
    updateBrand,
    deleteBrand
};