const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const productRouter = require('./routes/product.route');
const invoiceRouter = require('./routes/invoice.route');

dotenv.config({
  path: '.config.env',
});

// init app
const app = express();

// middleware
app.use(express.json());

// enabling cors for all requests by using cors middleware
app.use(cors());

// Enable pre-flight
app.options('*', cors());

app.post('/api/v1/users', (req, res, next) => {
  console.log(req.body);
  let admin = {
    id: '123456abcd',
    username: 'admin',
    password: 'admin',
  };
  const { username, password } = req.body;
  if (admin.username !== username) {
    return res.status(403).json({
      status: 'error',
      message: 'Tài khoản không hợp lệ',
    });
  }
  if (admin.password !== password) {
    return res.status(403).json({
      status: 'error',
      message: 'Mật khẩu không hợp lệ',
    });
  }
  if (admin.password === password && admin.username) {
    return res.json({
      token: admin.id,
      status: 'success',
    });
  }
});

app.use(`/api/v1/products`, productRouter);
app.use(`/api/v1/invoices`, invoiceRouter);

app.all('*', (req, res, next) => {
  const err = new HttpException(500, 'Endpoint Not Found');
  next(err);
});

app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, () => {
  console.log('App listen on port ' + process.env.PORT);
});
