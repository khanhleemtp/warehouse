const ProductModel = require('../models/product.model');
const HttpException = require('../utils/HttpException.utils');

/******************************************************************************
 *                              Post Controller
 ******************************************************************************/
class ProductController {
  getAllProduct = async (req, res, next) => {
    let productList = await ProductModel.find(req.query);
    if (req.query && req.query.from && req.query.to) {
      let unixproductIds = [
        ...new Set(productList.map((product) => product.id)),
      ];
      productList = unixproductIds.map((productId) => {
        const invoices = productList.filter((p) => p.id === productId);
        let product = {
          id: invoices[0].id,
          outPrice: invoices[0].outPrice,
          inPrice: invoices[0].inPrice,
          avaiable: invoices[0].avaiable,
          description: invoices[0].description,
          name: invoices[0].name,
          totalIn:
            invoices.filter((invoice) => invoice.type === 'in')[0].totalQty * 1,
          totalOut:
            invoices.filter((invoice) => invoice.type === 'out')[0].totalQty *
            1,
        };
        return product;
      });
    }
    if (!productList.length) {
      throw new HttpException(
        404,
        'Không tìm thấy sản phẩm trong kho vui lòng nhập lại ngày ⛴ 🧑'
      );
    }
    res.status(200).json({
      status: 'success',
      result: productList.length,
      data: productList,
    });
  };

  getByTime = async (req, res, next) => {
    console.log('query: ', req.query);
    let productList = await ProductModel.findByTime(req.query);
    console.log('product list', productList);
    productList = productList.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      inPrice: product.inPrice,
      outPrice: product.outPrice,
      avaiable: product.avaiable,
    }));

    if (!productList.length) {
      throw new HttpException(404, 'Không tìm thấy sản phẩm');
    }

    res.status(200).json({
      status: 'success',
      result: productList.length,
      data: productList,
    });
  };

  getProductById = async (req, res, next) => {
    const product = await ProductModel.findOne({ id: req.params.id });
    if (!product) {
      throw new HttpException(404, 'Không tìm thấy sản phẩm');
    }

    res.status(200).json({
      status: 'success',
      data: product,
    });
  };

  createProduct = async (req, res, next) => {
    const result = await ProductModel.create({
      name: req.body.name,
      inPrice: req.body.inPrice,
      description: req.body.description,
      outPrice: req.body.outPrice,
    });
    if (!result) {
      throw new HttpException(500, 'Có lỗi gì đó :(( ');
    }

    res.status(201).json({
      status: 'success',
      data: result,
    });
  };

  updateProduct = async (req, res, next) => {
    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await ProductModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, 'Có lỗi gì đó :v');
    }

    const { affectedRows, changedRows } = result;

    const message = !affectedRows
      ? 'Product not found'
      : affectedRows && changedRows
      ? 'Product updated successfully'
      : 'Updated faild';

    res.status(200).json({
      status: 'success',
      message,
    });
  };

  deleteProduct = async (req, res, next) => {
    const result = await ProductModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, 'Không thấy sản phẩm');
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProductController();
