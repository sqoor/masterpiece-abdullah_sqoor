const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const products = require("./api/routes/products");
const orders = require("./api/routes/orders");
const users = require("./api/routes/users");

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'server is working'
    });
});
*/

mongoose
  .connect(
    // "mongodb+srv://node-restfull-api:" +
    // process.env.MONGO_ATLAS_PW +
    // "@cluster0-dxkmc.mongodb.net/test?retryWrites=true&w=majority",
    "mongodb://localhost/node_restful_api",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Connected to mongodb...");
  })
  .catch(err => {
    console.log("failed to connect to mongodb due to: ", err);
  });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
// app.use(express.static('uploads'))
// app.use(cors());

app.use((req, res, next) => {
  // req.header('Access-Controll-Allows-Origin', 'http://name-my-page.com')
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DElETE");
    return res.status(200).json({});
  }
  next();
});

// handle resources
app.use("/products", products);
app.use("/orders", orders);
app.use("/users", users);

app.get("/video-test", (req, res) => {
  res.sendFile(__dirname + "/video.html");
});

// handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports = app;
