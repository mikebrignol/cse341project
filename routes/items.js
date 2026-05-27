const router = require('express').Router();
const validate = require('../middleware/validate');

const itemsController = require('../controllers/items');

/**
 * #swagger.tags = ['Items']
 */
router.get('/', itemsController.getAll);
router.get('/:id', itemsController.getSingle);
router.post('/', validate.validateItem, itemsController.createItem);
router.put('/:id', validate.validateItem, itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
