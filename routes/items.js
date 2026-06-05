const router = require('express').Router();
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');
const itemsController = require('../controllers/items');

/**
 * #swagger.tags = ['Items']
 */
router.get('/', itemsController.getAll);
router.get('/:id', itemsController.getSingle);
router.post('/', isAuthenticated, validate.validateItem, itemsController.createItem);
router.put('/:id', isAuthenticated, validate.validateItem, itemsController.updateItem);
router.delete('/:id', isAuthenticated, itemsController.deleteItem);

module.exports = router;
