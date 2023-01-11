const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");

const createServer = () => {
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api", (req, res) => {
    res.json({
      message: "Hello world",
    });
  });

  app.use((req, res, next) => {
    next(createError.NotFound("This route doesnot exist"));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.json({
      status: err.status || 500,
      error: err.message,
    });
  });

  return app;
};

module.exports = createServer;
