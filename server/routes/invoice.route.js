const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const HttpException = require('../utils/HttpException.utils');

router
  .route('/')
  .get(
    awaitHandlerFactory((req, res, next) => {
      //let sql = `SELECT * FROM invoice`
      // INSERT INTO `invoice`(`title`, `totalPrice`, `timeCreate`, `customer`, `employee`, `type`) VALUES ();
    })
  )
  .post(
    awaitHandlerFactory(async (req, res, next) => {
      console.log('body', req.body);
      //   let sql = `SELECT * FROM invoice`;
      // INSERT INTO `invoice`(`title`, `totalPrice`, `timeCreate`, `customer`, `employee`, `type`) VALUES ();

      // Create Invoice
      const invoiceSql = `INSERT INTO invoice
      ( title, totalPrice, timeCreate, customer, employee, type ) VALUES (?,?,?,?,?,?)`;
      const {
        title,
        totalPrice,
        timeCreate,
        customer,
        employee,
        type,
        history,
      } = req.body;

      const result = await query(invoiceSql, [
        title,
        totalPrice,
        timeCreate,
        customer,
        employee,
        type,
      ]);

      let invoiceId = result.insertId;

      // Create history
      let historyArr = history.map((h) => ({
        productId: h.id,
        invoiceId: invoiceId,
        quantity: h.quantity,
      }));

      console.log(historyArr);

      let keys = Object.keys(historyArr[0]);

      let values = historyArr.map((obj) => keys.map((key) => obj[key]));
      console.log('values', values);
      const historyResult = [];
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        let historySql =
          'INSERT INTO history (productId, invoiceId, quantity) VALUES (?, ?, ?)';
        const historyR = await query(historySql, value);
        historyResult.push(historyR);
      }
      // update product

      let products = history.map((h) => ({
        productId: h.id,
        quantity: h.quantity,
      }));

      let productResult = [];

      // find avaiable in product
      //   if (!product) {
      //     throw new HttpException(404, 'Product not found');
      //   }

      // find avaiable

      let avaiableProducts = [];
      for (let i = 0; i < products.length; i++) {
        const sql = `SELECT avaiable, name FROM product WHERE id = ? `;
        const avaiable = await query(sql, [products[i].productId * 1]);
        avaiableProducts.push(avaiable[0]);
      }

      // check avaiable
      if (type === 'out') {
        avaiableProducts.forEach((product) => {
          if (product.avaiable * 1 - products.quantity * 1 < 0) {
            throw new HttpException('404', `${product.name} not enough !`);
          }
        });
      }

      // Update product
      for (let i = 0; i < products.length; i++) {
        let prefix = type === 'in' ? '+' : '-';

        const productSql = `UPDATE product SET avaiable = avaiable ${prefix} ? WHERE id = ?`;
        const presult = await query(productSql, [
          products[i].quantity * 1,
          products[i].productId * 1,
        ]);
        productResult.push(presult);
      }

      // send to client
      res.status(201).json({
        status: 'success',
        invoiceId,
      });
    })
  );

router.route('/:id').get(
  awaitHandlerFactory(async (req, res, next) => {
    const id = req.params.id;
    const sql = `SELECT 
  	invoice.id as invoiceId,
    invoice.title as title,
    invoice.type as type,
    invoice.totalPrice as totalPrice,
    invoice.customer as customer,
    invoice.employee as employee,
    invoice.timeCreate as timeCreate,
    history.quantity as quantity,
    product.id as productId,
    product.name as name,
    product.outPrice as outPrice,
    product.inPrice as inPrice
    
    FROM invoice
    LEFT JOIN history on history.invoiceId = invoice.id
    LEFT JOIN product on product.id = history.productId

    WHERE product.isActive= 1 AND invoice.id = ?;
    `;

    const output = await query(sql, [id]);
    console.log(output);

    const history = output.map((i) => ({
      quantity: i.quantity,
      productId: i.productId,
      inPrice: i.inPrice,
      outPrice: i.outPrice,
      name: i.name,
    }));

    let invoice = {
      id: output[0].invoiceId,
      type: output[0].type,
      title: output[0].title,
      totalPrice: output[0].totalPrice,
      customer: output[0].customer,
      employee: output[0].employee,
      timeCreate: output[0].timeCreate,
      history,
    };

    res.status(200).json({
      data: invoice,
      status: 'success',
    });
  })
);

module.exports = router;
