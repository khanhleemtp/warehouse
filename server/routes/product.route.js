const express = require('express');
const router = express.Router({ mergeParams: true });
const productController = require('../controllers/product.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router
  .route('/')
  .get(awaitHandlerFactory(productController.getAllProduct))
  .post(awaitHandlerFactory(productController.createProduct));

router
  .route('/:id')
  .get(awaitHandlerFactory(productController.getProductById))
  .delete(awaitHandlerFactory(productController.deleteProduct))
  .patch(awaitHandlerFactory(productController.updateProduct));
module.exports = router;
