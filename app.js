var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
require('dotenv').config()
var app = express();

app.use(logger('dev'));
app.use(express.json());

mongoose.connect(process.env.DB,{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true 
  })
  .then(()=> {
    console.log("Connected to database")
    console.log("PORT: ", process.env.PORT)
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_DEV != "development") {
        res.status(err.statusCode).json({ status: err.status, message: err.message });
    } else {
        res.status(err.statusCode).json({ status: err.status, message: err.message, stack: err.stack });
    }
})

module.exports = app;
