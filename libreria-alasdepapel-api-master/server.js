const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');

// Models
require('./models/models')(wagner);
const user = require('./router/user.router.js')(wagner);
const category = require('./router/category.router.js')(wagner);
const book = require('./router/book.router.js')(wagner);

let app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// ROUTERS
const uri = `/api/v1/`;

app.use(uri + 'user', user);
app.use(uri + 'category', category);
app.use(uri + 'book', book);

module.exports = app;
