// const mysql2 = require('mysql2');

// create Connection
// const db = mysql2.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
// });

// // connect
// db.getConnection((err, conn) => {
//   if (err) {
//     throw err;
//   }
//   console.log('My sql connected..');
//   db.releaseConnection(conn);
// });

// app.get('/createposttable', (req, res) => {
//   let sql =
//     'CREATE TABLE posts(id INT AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Create table done');
//   });
// });

// // INSERT post 1
// app.get('/addpost1', (req, res) => {
//   let post = { title: 'Post One', body: 'This is post 1' };
//   let sql = `INSERT INTO posts SET ?`;
//   db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Post one added..');
//   });
// });

// app.get('/addpost2', (req, res) => {
//   let post = { title: 'Post Two', body: 'This is post 2' };
//   let sql = `INSERT INTO posts SET ?`;
//   db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Post 2 added..');
//   });
// });

// // select posts
// app.get('/getposts', (req, res) => {
//   let sql = `SELECT * FROM posts`;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send('Post fetch.');
//   });
// });

// // select single post
// app.get('/getposts/:id', (req, res) => {
//   let sql = `SELECT * FROM posts WHERE id= ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Post fetch.');
//   });
// });

// // update single post
// app.get('/updateposts/:id', (req, res) => {
//   let newTitle = 'Update title';
//   let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${
//     req.params.id * 1
//   }`;
//   console.log('sql: ', sql);
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Post updated.');
//   });
// });

// app.get('/deleteposts/:id', (req, res) => {
//   let sql = `DELETE FROM posts WHERE id = ${req.params.id * 1}`;
//   console.log('sql: ', sql);
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Post deleted.');
//   });
// });
