# warehouse
# technology:  
  - my sql, reactjs, nodejs 
# setting sql 
``` mysql
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
```
# run
  - cd server -> yarn dev
  - cd client -> yarn start
