const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const checkAuth = require("../middleware/check-auth");
const lessonsController = require("../controllers/lessons");
const Lesson = require("../models/lesson.js");

// testing routes/

// 1- create lesson
router.post("/test", async (req, res) => {
  let createdLesson;

  const newLesson = {
    name: req.body.name,
    image: req.body.image,
    progress: 0,
    questions: []
  };

  try {
    createdLesson = await Lesson.create(newLesson);

    return res.status(201).json(createdLesson);
  } catch (e) {
    console.log(":", e);

    return res
      .status(500)
      .json("Something went wrong, error creating a new question");
  }
});

// get all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    return res.status(200).json(lessons);
  } catch (e) {
    console.log("Error retreving all lessons", e);
    return res.status(500).json("Something went wrong");
  }
});

// 2- add question
router.post("/:id/question", async (req, res) => {
  try {
    const lessonId = req.params.id;
    const newQuestion = {
      _id: new mongoose.Types.ObjectId(),
      language: {
        question: req.body.language.question,
        answer: req.body.language.answer
      },
      formate: req.body.formate,
      type: req.body.type,
      question: req.body.question,
      choices: req.body.choices,
      answer: req.body.answer
    };

    const lesson = await Lesson.updateOne(
      { _id: lessonId },
      { $set: { questions: newQuestion } }
    );

    res.status(201).json(lesson);
  } catch (e) {
    console.log("Error adding a question to a lesson", e);

    res.status(500).json("Error adding a question to a lesson");
  }
});

// end testing

router.get("/", checkAuth, lessonsController.getAll);
router.get("/:id", checkAuth, () => lessonsController.getOne);
router.post("/", checkAuth, lessonsController.create);
router.put("/:id", checkAuth, () => lessonsController.updateOne);
router.delete("/:id", checkAuth, () => lessonsController.deleteOne);

/* 
router.get("/", checkAuth, ordersController.getAll);
router.post("/", checkAuth, ordersController.create);
router.get("/:id", checkAuth, ordersController.getOne);
router.delete("/:id", checkAuth, ordersController.deleteOne);
*/

module.exports = router;
