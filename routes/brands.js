const router = require('express').Router();

const brandsController = require('../controllers/brands');
const validate = require('../middleware/validate');

/**
 * #swagger.tags = ['Brands']
 */
router.get('/', brandsController.getAll);
router.get('/:id', brandsController.getSingle);
router.post('/', validate.validateBrand, brandsController.createBrand);
router.put('/:id', validate.validateBrand, brandsController.updateBrand);
router.delete('/:id', brandsController.deleteBrand);

module.exports = router;