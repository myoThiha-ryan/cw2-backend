const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const propertiesReader = require("properties-reader");
const propertiesPath = path.resolve(__dirname, "conf/db.properties");
const properties = propertiesReader(propertiesPath);
const dbPrefix = properties.get("db.prefix");

/* URL-Encoding of User and PWD
for potential special characters */
const dbUsername = encodeURIComponent(properties.get("db.user"));
const dbPwd = encodeURIComponent(properties.get("db.pwd"));
const dbName = properties.get("db.dbName");
const dbUrl = properties.get("db.dbUrl");
const dbParams = properties.get("db.params");
const uri = dbPrefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

/* mongoDB connection with Mongoclient */
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const db = client.db(dbName);

/* initialising express app */
const app = express();
app.use(cors());
app.use(morgan("short")); // logger middleware to log all the requests
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to After School Application");
});

app.get("/lessons", async function (req, res) {
  const lessonsResult = await db.collection("lessons").find().toArray();
  res.send(lessonsResult);
});

app.put("/lessons", function (req, res) {
  const lessonsToUpdate = req.body;
  lessonsToUpdate.forEach(async function (lesson) {
    await db
      .collection("lessons")
      .updateOne(
        { id: lesson.id },
        { $set: { availability: lesson.availability } }
      );
  });
  res.send("Updated availability for lessons");
});

app.post("/orders", async function (req, res) {
  const order = req.body;
  const orderResult = await db
    .collection("orders")
    .insertOne(order, { ordered: true });
  res.send(JSON.stringify(orderResult));
});

app.get("/search", async function (req, res) {
  const searchTerm = req.query.searchTerm;
  const filteredLessonsResult = await db
    .collection("lessons")
    .find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    })
    .toArray();
  res.send(filteredLessonsResult);
});

/* middleware to handle static files */
app.use(function (req, res, next) {
  if (
    req.url.includes("/lessons") ||
    req.url.includes("/search") ||
    req.url.includes("/orders")
  ) {
    return;
  }
  const filePath = path.join(__dirname, "public", req.url);
  fs.stat(filePath, function (err, fileInfo) {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

/* middleware to handle file that not exists */
app.use(function (req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function () {
  console.log("Server started listening on port: 3000 ....");
});
