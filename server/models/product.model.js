const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

// exports.multipleColumnSet = (object) => {
//     if (typeof object !== 'object') {
//       throw new Error('Invalid input');
//     }

//     const keys = Object.keys(object);
//     const values = Object.values(object);

//     let columnSet = keys.map((key) => `${key} = ?`).join(', ');

//     return {
//       columnSet,
//       values,
//     };
//   };

class ProductModel {
  tableName = 'product';

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName} WHERE isActive=true`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    let where = '';
    if (params.from && params.to) {
      where += `(invoice.timeCreate BETWEEN '${params.from}' AND '${params.to}') AND `;
    }
    if (params.avaiable) {
      where += `(product.avaiable BETWEEN ${params.avaiable.gt * 1} AND ${
        params.avaiable.lt * 1
      }) AND `;
    }
    if (params.name) {
      where += `(product.name LIKE '%${params.name}%') AND `;
    }

    console.log(' where: ', where);

    sql = `
      SELECT
      product.id as id,
        product.inPrice as inPrice,
        product.outPrice as outPrice,
        product.avaiable as avaiable,
        product.name as name,
        product.description as description,
        invoice.timeCreate as timeCreate,
        SUM(history.quantity) as totalQty,
        invoice.type as type
    
        FROM product
    
    
        LEFT JOIN history
        ON product.id = history.productId
        LEFT JOIN invoice
        ON invoice.id = history.invoiceId
    
        WHERE ${where} product.isActive = TRUE AND invoice.type='in'
           GROUP BY product.id
    UNION
    
    SELECT
      product.id as id,
        product.inPrice as inPrice,
        product.outPrice as outPrice,
        product.avaiable as avaiable,
        product.name as name,
        product.description as description,
        invoice.timeCreate as timeCreate,
        SUM(history.quantity) as totalQty,
        invoice.type as type
    
        FROM product
    
    
        LEFT JOIN history
        ON product.id = history.productId
        LEFT JOIN invoice
        ON invoice.id = history.invoiceId
    
        WHERE ${where} product.isActive = TRUE AND invoice.type='out'
        
        
        GROUP BY product.id
      `;

    return await query(sql);
  };

  // { id: req.params.id }
  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  create = async ({ name, description, inPrice, outPrice }) => {
    const sql = `INSERT INTO ${this.tableName}
        ( name, description, inPrice, outPrice ) VALUES (?,?,?,?)`;

    const result = await query(sql, [name, description, inPrice, outPrice]);

    console.log(result);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  delete = async (id) => {
    const sql = `UPDATE ${this.tableName} SET isActive=FALSE
        WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
    // [...values, id] covert ? -> value
    const result = await query(sql, [...values, id]);

    return result;
  };
}

module.exports = new ProductModel();
