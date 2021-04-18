CREATE TABLE product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  avaiable INT DEFAULT 0,
  name VARCHAR(24),
  description VARCHAR(24),
  inPrice INT DEFAULT 0,
  outPrice INT DEFAULT 0,
  isActive BOOLEAN DEFAULT TRUE
);
CREATE TABLE history(
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT,
  invoiceId INT,
  quantity INT,
);
CREATE TABLE invoice (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type enum('in', 'out'),
  title VARCHAR(24),
  totalPrice INT,
  timeCreate DATE,
  customer VARCHAR(24),
  employee VARCHAR(24)
);
ALTER TABLE history
ADD FOREIGN KEY(invoiceId) REFERENCES invoice(id) ON DELETE
SET NULL;
ALTER TABLE history
ADD FOREIGN KEY(productId) REFERENCES product(id) ON DELETE
SET NULL;
CREATE TABLE stock_item (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  quantity INT,
  supplier_id INT,
  product_id INT
);
CREATE TABLE order_item (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  quantity INT,
  product_id INT,
  invoice_id INT
);
ALTER TABLE stock_item
ADD FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE;
ALTER TABLE stock_item
ADD FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id) ON DELETE
SET NULL;
ALTER TABLE order_item
ADD FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE;
ALTER TABLE order_item
ADD FOREIGN KEY(invoice_id) REFERENCES invoice(invoice_id) ON DELETE CASCADE;
ALTER TABLE product
ADD FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE
SET NULL;
-- ALTER TABLE product
-- ADD FOREIGN KEY(super_id)
-- REFERENCES employee(emp_id)
-- ON DELETE SET NULL;
-- CREATE TABLE works_with (
--   emp_id INT,
--   client_id INT,
--   total_sales INT,
--   PRIMARY KEY(emp_id, client_id),
--   FOREIGN KEY(emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE,
--   FOREIGN KEY(client_id) REFERENCES client(client_id) ON DELETE CASCADE
-- );
-- CREATE TABLE branch_supplier (
--   branch_id INT,
--   supplier_name VARCHAR(40),
--   supply_type VARCHAR(40),
--   PRIMARY KEY(branch_id, supplier_name),
--   FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE CASCADE
-- );
--   FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL