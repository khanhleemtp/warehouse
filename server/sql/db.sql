-- type
INT
DECIMAL(m,n);
VARCHAR(n)
DATE --yyyy-mm-dd
TIMESTAMP --yyy-mm-dd hh:mm:ss

-- TABLE
-- create table name maxium 24 character
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name VARCHAR(24),
    major VARCHAR(20)
);

-- the same
CREATE TABLE student (
    student_id INT,
    name VARCHAR(24),
    major VARCHAR(20(,
    PRIMARY KEY(student_id)
);

-- structure table
DESCRIBE student;

-- delete table 
DROP TABLE student;
-- add column
ALTER TABLE student ADD gpa DECIMAL(3,2);

ALTER TABLE student DROP gpa;

-- INSERT TABLE
-- single quote
INSERT INTO student VALUES (
1, 'JACK', 'Biology'
);

-- chỉ định cái cần thêm ở hàng
INSERT INTO student(student_id, name) VALUES (
3, 'Claire'
);

SELECT * FROM student;

-- CONSTRAINS

CREATE TABLE student (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(24) NOT NULL DEFAULT 'hello',
    major VARCHAR(20) UNIQUE,
    PRIMARY KEY(student_id)
);


-- UPDADTE and DELETE row
UPDATE student
SET major = 'Bio'
WHERE major = 'Code' OR student_id = 1;

-- update all row
UPDATE student
SET major = 'Bio';

-- delete row
DELETE FROM student WHERE student_id = 2;


-- QUERY

SELECT *
FROM student

SELECT student.name as studentName
FROM student
ORDER BY name DESC 
LIMIT 1
WHERE student_id = 1
;
-- < , >, >=, <=, <>, =, AND, OR, IN('abc', 'def')

--ASC;
-- company table
-- FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL


CREATE TABLE employee (
  emp_id INT PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  birth_day DATE,
  sex VARCHAR(1),
  salary INT,
  super_id INT,
  branch_id INT
);

CREATE TABLE branch (
  branch_id INT PRIMARY KEY,
  branch_name VARCHAR(40),
  mgr_id INT,
  mgr_start_date DATE,
  FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL
);

ALTER TABLE employee
ADD FOREIGN KEY(branch_id)
REFERENCES branch(branch_id)
ON DELETE SET NULL;

ALTER TABLE employee
ADD FOREIGN KEY(super_id)
REFERENCES employee(emp_id)
ON DELETE SET NULL;

CREATE TABLE client (
  client_id INT PRIMARY KEY,
  client_name VARCHAR(40),
  branch_id INT,
  FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE SET NULL
);

CREATE TABLE works_with (
  emp_id INT,
  client_id INT,
  total_sales INT,
  PRIMARY KEY(emp_id, client_id),
  FOREIGN KEY(emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE,
  FOREIGN KEY(client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE branch_supplier (
  branch_id INT,
  supplier_name VARCHAR(40),
  supply_type VARCHAR(40),
  PRIMARY KEY(branch_id, supplier_name),
  FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE CASCADE
);


-- -----------------------------------------------------------------------------

-- Corporate
INSERT INTO employee VALUES(100, 'David', 'Wallace', '1967-11-17', 'M', 250000, NULL, NULL);

INSERT INTO branch VALUES(1, 'Corporate', 100, '2006-02-09');

UPDATE employee
SET branch_id = 1
WHERE emp_id = 100;

INSERT INTO employee VALUES(101, 'Jan', 'Levinson', '1961-05-11', 'F', 110000, 100, 1);

-- Scranton
INSERT INTO employee VALUES(102, 'Michael', 'Scott', '1964-03-15', 'M', 75000, 100, NULL);

INSERT INTO branch VALUES(2, 'Scranton', 102, '1992-04-06');

UPDATE employee
SET branch_id = 2
WHERE emp_id = 102;

INSERT INTO employee VALUES(103, 'Angela', 'Martin', '1971-06-25', 'F', 63000, 102, 2);
INSERT INTO employee VALUES(104, 'Kelly', 'Kapoor', '1980-02-05', 'F', 55000, 102, 2);
INSERT INTO employee VALUES(105, 'Stanley', 'Hudson', '1958-02-19', 'M', 69000, 102, 2);

-- Stamford
INSERT INTO employee VALUES(106, 'Josh', 'Porter', '1969-09-05', 'M', 78000, 100, NULL);

INSERT INTO branch VALUES(3, 'Stamford', 106, '1998-02-13');

UPDATE employee
SET branch_id = 3
WHERE emp_id = 106;

INSERT INTO employee VALUES(107, 'Andy', 'Bernard', '1973-07-22', 'M', 65000, 106, 3);
INSERT INTO employee VALUES(108, 'Jim', 'Halpert', '1978-10-01', 'M', 71000, 106, 3);


-- BRANCH SUPPLIER
INSERT INTO branch_supplier VALUES(2, 'Hammer Mill', 'Paper');
INSERT INTO branch_supplier VALUES(2, 'Uni-ball', 'Writing Utensils');
INSERT INTO branch_supplier VALUES(3, 'Patriot Paper', 'Paper');
INSERT INTO branch_supplier VALUES(2, 'J.T. Forms & Labels', 'Custom Forms');
INSERT INTO branch_supplier VALUES(3, 'Uni-ball', 'Writing Utensils');
INSERT INTO branch_supplier VALUES(3, 'Hammer Mill', 'Paper');
INSERT INTO branch_supplier VALUES(3, 'Stamford Lables', 'Custom Forms');

-- CLIENT
INSERT INTO client VALUES(400, 'Dunmore Highschool', 2);
INSERT INTO client VALUES(401, 'Lackawana Country', 2);
INSERT INTO client VALUES(402, 'FedEx', 3);
INSERT INTO client VALUES(403, 'John Daly Law, LLC', 3);
INSERT INTO client VALUES(404, 'Scranton Whitepages', 2);
INSERT INTO client VALUES(405, 'Times Newspaper', 3);
INSERT INTO client VALUES(406, 'FedEx', 2);

-- WORKS_WITH
INSERT INTO works_with VALUES(105, 400, 55000);
INSERT INTO works_with VALUES(102, 401, 267000);
INSERT INTO works_with VALUES(108, 402, 22500);
INSERT INTO works_with VALUES(107, 403, 5000);
INSERT INTO works_with VALUES(108, 403, 12000);
INSERT INTO works_with VALUES(105, 404, 33000);
INSERT INTO works_with VALUES(107, 405, 26000);
INSERT INTO works_with VALUES(102, 406, 15000);
INSERT INTO works_with VALUES(105, 406, 130000);

-- ADD FOREIGN KEY
ALTER TABLE employee
ADD FOREIGN KEY(branch_id)
REFERENCES branch(branch_id)
ON DELETE SET NULL;

ALTER TABLE employee
ADD FOREIGN KEY(super_id)
REFERENCES employee(emp_id)
ON DELETE SET NULL

-- Basic Query
-- find out all the diffrent different sex
SELECT DISTINCT sex
FROM employee;

-- SQL Function
-- find the number of employees
SELECT COUNT(emp_id)
FROM employee;

-- find the number of female employees born after 1970
SELECT COUNT(emp_id)
FROM employee 
WHERE sex = 'F' AND birth_day > '1970-01-01';
-- find the sum of all employees's salaries
SELECT SUM(salary)
FROM employee
WHERE sex = 'M',

-- find out how many males and females there are
SELECT COUNT(sex), sex
FROM employee
GROUP BY sex;

-- find the total sales of each salemans

SELECT SUM(total_sales), emp_id,
FROM works_with
GROUP BY emp_id;

-- Wild CARD

-- % any # characters, _ = one character

-- find any client's who are an LLC
SELECT *
FROM client
WHERE client_name LIKE '%LLC';

-- find any branch suppliers who are in the label business
SELECT *
FROM branch_supplier
WHERE supplier_name LIKE '% Label%'

-- find any employee born in October
SELECT *
FROM employee
WHERE birth_day LIKE '____-10%' 

-- find client who are schools
SELECT *
FROM client
WHERE client_name LIKE '%school%';

-- UNION combine result in multiple select
SELECT first_name as Company_Names
FROM employee
UNION
SELECT branch_name
FROM branch
UNION
SELECT client_name
FROM client
;

-- find a list of employee and branch name
SELECT client_name, client.branch_id
FROM client
UNION
SELECT supplier_name, branch_supplier.branch_id
FROM branch_supplier

-- find a list of all money spent or earned by the company
SELECT salary
FROM employee
UNION
SELECT total_sales
FROM works_with;

-- find all branches and the name of their managers
 SELECT employee.emp_id, employee.first_name, branch.branch_name
 FROM employee
 JOIN branch
 ON employee.emp_id = branch.mgr_id
 -- combine table

 -- JOIN, LEFT JOIN, RIGHT JOIN
 -- LEFT JOIN: (Left-table) all employee (if not exist -> null)
 -- RIGHT JOIN: all branch

 -- NESTED QUERY
 -- multiple selection: select result select

 -- Find names of all employees who have 
 -- sold over 30.000 to a single client

 SELECT employee.last_name
 FROM employee
 WHERE employee.emp_id IN (
     SELECT works_with.emp_id
     FROM works_with
     WHERE works_with.total_sales > 30000
     LIMIT 3
 )

-- ON DELETE SET NULL -> set field -> all null
-- ON DELETE SET CASCADE -> delete all row
DELETE FROM employee
WHERE emp_id = 102;


CREATE TABLE branch (
  branch_id INT PRIMARY KEY,
  branch_name VARCHAR(40),
  mgr_id INT,
  mgr_start_date DATE,
  FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL
-- mgr_id chỉ là FOREIGN KEY() có thể null
);

CREATE TABLE branch_supplier (
  branch_id INT,
  supplier_name VARCHAR(40),
  supply_type VARCHAR(40),
  PRIMARY KEY(branch_id, supplier_name),
  FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE CASCADE
    -- branch_id vừa là PRIMARY KEY nên k thể null và FOREIGN KEY() của bảng
);

-- TRIGGER 

-- ER Diagram
 /*
  - Entity: An object we want to model & store information about
    + Student
  - Attributes: chỉ định phần thông tin của thực thể
    + Student -> grade#, gpa, name (attribute)
  - Primary key: attributes unique in db table (underline)
    + student_id (gạch dưới)
  - Composite Attribute: 1 thuộc tính mà có có các thuộc tính con
    + name: fname, lname
  - Multi-valued Attribute - 1 attribute gồm nhiều hơn 1 giá trị
    + clubs ( 2 vòng tròn )
  - Derived Attribute: 1 thuộc tính xuất phát từ 1 thuộc tính khác
    + has_honors (thành tích)(from GPA)
  


  - Muiltipe Entities: 
    Bạn có thể định nghĩa nhiều hơn 1 entity trong 1 biểu đồ
  - Relationship: định nghĩa 1 quan hệ giữa 2 thực thể
  - Total Participation(tham dự): // 2 gạch
    Tất cả thành viên phải tham dự trong relationship
  - Partial participation (1 phần tham dự): / 1 gạch
  - Class -// take -/ Student
    + Tất cả class phải có student đăng kí
    + Not all student dăng kí 1 class
  - Relationship Attribute 
    + 1 attribute về 1 relationship 
    + grade
  - Relationship Cardinality: 
    + số lượng instances of 1 thực thể từ 1 quan hệ mà nó lk
    + 1:1, 1:N, N:M
    + 1 hs có thể đăng kí nhiều lớp 
    + 1 lớp có nhiều học sinh đăng kí 
    + N:M
  - Weak Entity:  1 thực thể không phải xác định duy nhất 
    bởi 1 thuộc tính
    - Muốn có Exam phải có pải trong class | [Class] <<has>> [[exam]]
    - Class thì k cần có example
  - Identifying relationship: khóa chính của week entity


  */ 


/*
## Requirement
Company Data Storage Requirements
The company is organized into branches.
Each branch has a unique number, a name, and a particular employee who manages it.

The company makes it’s money by selling to clients.
Each client has a name and a unique number to identify it.


The foundation of the company is it’s employees.
Each employee has a name, birthday, sex, salary and a unique number.

An employee can work for one branch at a time, 
and each branch will be managed by one of the employees that work there.
We’ll also want to keep track of when the current manager started as manager.

An employee can act as a supervisor for other employees at the branch, an employee may also act as the supervisor for employees at other branches. 
An employee can have at most one supervisor.

A branch may handle a number of clients, 
with each client having a name and a unique number to identify it.
A single client may only be handled by one branch at a time.

Employees can work with clients controlled by their branch to sell them stuff. 
If nescessary multiple employees can work with the same client.
We’ll want to keep track of how many dollars worth of stuff each employee sells to each client they work with.

Many branches will need to work with suppliers to buy inventory. 
For each supplier we’ll keep track of their name and the type of product they’re selling the branch.
A single supplier may supply products to multiple branches.

*/

/*
An employee can work for one branch at a time:
  - 1 nhân viên phải làm 1 việc ở 1 nhánh tại 1 thời điểm
  - 1 nhánh có nhiều nhân viên làm việc

each branch will be managed by one of the employees that work there.
We’ll also want to keep track of when the current manager started as manager.
  - 1 branch phải 1 nhân viên quản lý (start-date)
  - 1 nhân viên có thể không quản lý branch

An employee can act as a supervisor for other employees at the branch, an employee may also act as the supervisor for employees at other branches. 
An employee can have at most one supervisor.
  - Relationship với chính nó 
*/

-- Covert E-R Diagram into DB

/*
1. Mappting of regular entity types
  - từng thực thể thông thường tạo bảng gồm các thuộc tính thông thường
2. Mappting of week entity types
  - từng week entity tạo bảng gồm tấc cả thuộc tính đơn giản of weak entiy
  - primary gồm cả primary key của thực thể tạo ra nó
    + supplier_name and branch_id 
3. Mappting of binary 1:1 Relationship types
  - Gồm 1 nơi of relationship như khóa ngoại tại nơi có quan hệ là total particular (phải có)
4. Mapping 1:N Relationship types
  - Đặt khóa ngoại tại bảng có quan hệ N
  - branch- employees (Foreign key in branch)
5. Mappting of binary M:N Relationship
  - Tạo 1 bảng mới giữ 2 primary của 2 thực thể 
  và gồm all attribute trong relationship
  - compound key
*/