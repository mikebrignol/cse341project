const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().collection('smartphone').find();

  const items = await result.toArray();

  res.setHeader('Content-Type', 'application/json');

  res.status(200).json(items);
};

const getSingle = async (req, res) => {
  const itemId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .collection('smartphone')
    .find({ _id: itemId });

  const item = await result.toArray();

  res.status(200).json(item[0]);
};

const createItem = async (req, res) => {
  const item = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    storage: req.body.storage
  };

  const response = await mongodb
    .getDb()
    .collection('smartphone')
    .insertOne(item);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

const updateItem = async (req, res) => {
  const itemId = new ObjectId(req.params.id);

  const item = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    storage: req.body.storage
  };

  const response = await mongodb
    .getDb()
    .collection('smartphone')
    .replaceOne({ _id: itemId }, item);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

const deleteItem = async (req, res) => {
  const itemId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDb()
    .collection('smartphone')
    .deleteOne({ _id: itemId });

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

module.exports = {
  getAll,
  getSingle,
  createItem,
  updateItem,
  deleteItem
};