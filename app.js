var express = require("express");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

var usersRouter = require("./routes/usersRouter");
var authRouter = require("./routes/authRouter");
var kennelRouter = require("./routes/kennelRouter")
var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(cors());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/", kennelRouter)
// app.use(passport.initialize())

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// })

// error handler
// app.use(function(err, req, res, next) {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || "error";
//     if (process.env.NODE_DEV != "development") {
//         res.status(err.statusCode).json({ status: err.status, message: err.message });
//     } else {
//         res.status(err.statusCode).json({ status: err.status, message: err.message, stack: err.stack });
//     }
// })

mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    console.log("PORT: ", process.env.PORT);
  });

module.exports = app;
