const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts-routes");
const userRoutes = require("./routes/auth");

const app = express();

mongoose
  .connect(
    "mongodb+srv://keerthi:" + process.env.MONGO_ATLAS_PASSWORD + "@justwrite-cluster-ot9en.mongodb.net/just-write?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin", "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;