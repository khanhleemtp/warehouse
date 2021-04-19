# warehouse

# technology:

- my sql, reactjs, nodejs

# setting sql

```mysql
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
  quantity INT
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

```

# run

- cd server -> yarn install (npm install) -> yarn dev (npm run dev)
- cd client -> yarn install (npm install) -> yarn start (npm run start)
