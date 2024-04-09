const fruitController = require('../controller/fruitsController');

const router = require('express').Router();

router.get('/', fruitController.getAllFruits)

router.get('/:id', fruitController.getAnFruits)

router.put('/:id',fruitController.updateFruits)

router.delete('/:id',fruitController.deleteFruits)

module.exports = router;
