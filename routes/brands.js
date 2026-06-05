const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authenticate');

const brandsController = require('../controllers/brands');
const validate = require('../middleware/validate');

/**
 * #swagger.tags = ['Brands']
 */
router.get('/', brandsController.getAll);
router.get('/:id', brandsController.getSingle);
router.post('/', isAuthenticated, validate.validateBrand, brandsController.createBrand);
router.put('/:id', isAuthenticated, validate.validateBrand, brandsController.updateBrand);
router.delete('/:id', isAuthenticated, brandsController.deleteBrand);

module.exports = router;