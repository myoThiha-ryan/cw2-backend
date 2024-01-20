const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const propertiesReader = require("properties-reader");
const propertiesPath = path.resolve(__dirname, "conf/db.properties");
const properties = propertiesReader(propertiesPath);

const dbPrefix = properties.get("db.prefix");
// URL-Encoding of User and PWD
// for potential special characters
const dbUsername = encodeURIComponent(properties.get("db.user"));
const dbPwd = encodeURIComponent(properties.get("db.pwd"));
const dbName = properties.get("db.dbName");
const dbUrl = properties.get("db.dbUrl");
const dbParams = properties.get("db.params");

const uri = dbPrefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const db = client.db(dbName);
const app = express();

app.use(cors());
app.use(express.json());

// app.use(function (req, res, next) {
//   console.log("In comes in ", req.method, " to ", req.url);
//   next();
// });

// app.use(function (req, res, next) {
//   const filePath = path.join(__dirname, "assets", req.url);
//   console.log(filePath);
//   fs.stat(filePath, function (err, fileInfo) {
//     if (err) {
//       next();
//       return;
//     }
//     if (fileInfo.isFile()) {
//       res.sendFile(filePath);
//     } else {
//       next();
//     }
//   });
// });

// app.use(function (req, res) {
//   res.status(404);
//   res.send("File not found!");
// });

app.get("/collections/:collectionName", async function (req, res, next) {
  const collectionName = req.params.collectionName;
  const lessons = await db.collection(collectionName).find().toArray();
  res.send(lessons);
});

app.listen(3000, function () {
  console.log("Server started listening on port: 3000 ....");
});
