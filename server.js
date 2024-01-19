const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

const lessons = [
  {
    id: 1,
    title: "Math",
    description:
      "Applications of mathematics in problem solving, finance, probability, statistics, geometry, population growth. ",
    image: "math_lesson.png",
    altImage: "math lesson image",
    price: 100,
    location: "Central London",
    availability: 5,
  },
  {
    id: 2,
    title: "English",
    description:
      "General English and Intensive English courses are designed to help students make rapid progress in English",
    image: "eng_lesson.png",
    altImage: "english lesson image",
    price: 200,
    location: "Wembley",
    availability: 5,
  },
  {
    id: 3,
    title: "Science",
    description:
      "This lesson will emphasize the development of basic scientific skills and concepts in chemistry, physics, earth science and biology. ",
    image: "/science_lesson.png",
    altImage: "science lesson image",
    price: 250,
    location: "Oxford",
    availability: 5,
  },
  {
    id: 4,
    title: "Programming",
    description:
      "This lesson will introduce the fundamental concepts of structured programming. ",
    image: "programming_lesson.png",
    altImage: "programming lesson image",
    price: 300,
    location: "Hendon",
    availability: 5,
  },
  {
    id: 5,
    title: "Geology",
    description:
      "Explore the wonders of the Earth with these geology science experiments. Investigate rocks, minerals, and geological processes.",
    image: "geology_lesson.png",
    altImage: "geology lesson image",
    price: 280,
    location: "Cambridge",
    availability: 5,
  },
  {
    id: 6,
    title: "History",
    description:
      "A lesson where students analyze historical evidence in order to form and test hypotheses about past events. ",
    image: "history_lesson.png",
    altImage: "history lesson image",
    price: 180,
    location: "Cambridge",
    availability: 5,
  },
  {
    id: 7,
    title: "Drawing",
    description:
      "During this activity, students explore different types of mark-making using pencils and crayons",
    image: "drawing_lesson.png",
    altImage: "drawing lesson image",
    price: 200,
    location: "West London",
    availability: 5,
  },
  {
    id: 8,
    title: "Music",
    description:
      "Music units with five lesson plans each, online teaching guidance, supporting resources and full curriculum coverage, skills progression.",
    image: "music_lesson.png",
    altImage: "music lesson image",
    price: 250,
    location: "Portsmouth",
    availability: 5,
  },
  {
    id: 9,
    title: "Sports",
    description:
      "This lesson includes sports such as football and basketball and other competitive leisure activities which need physical effort and skill.",
    image: "sports_lesson.png",
    altImage: "sports lesson image",
    price: 200,
    location: "Manchester",
    availability: 5,
  },
  {
    id: 10,
    title: "Martial Arts",
    description:
      "Martial arts training for kids will boost self-confidence, fitness and teaches important life skills and values.",
    image: "martial_arts_lesson.png",
    altImage: "martial_arts lesson image",
    price: 300,
    location: "Liverpool",
    availability: 5,
  },
  {
    id: 11,
    title: "Foreign Languages",
    description:
      "This lesson will help you immerse your foreign language students into fascinating cultures and make their language learning more meaningful.",
    image: "foreign_language_lesson.png",
    altImage: "foreign_language lesson image",
    price: 180,
    location: "Bristol",
    availability: 5,
  },
  {
    id: 12,
    title: "Cooking",
    description:
      "In this hands-on class, you'll learn how to chop, slice, and dice like a pro. ",
    image: "cooking_lesson.png",
    altImage: "cooking lesson image",
    price: 200,
    location: "Glasgow",
    availability: 5,
  },
];

app.use(cors());

app.use(function (req, res, next) {
  console.log("In comes in ", req.method, " to ", req.url);
  next();
});

app.use(function (req, res, next) {
  const filePath = path.join(__dirname, "assets", req.url);
  console.log(filePath);
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

app.get("/lessons", function (req, res) {
  res.send(lessons);
});

// app.use(function (req, res) {
//   res.status(404);
//   res.send("File not found!");
// });

app.listen(3000, function () {
  console.log("Server started listening on port: 3000 ....");
});
