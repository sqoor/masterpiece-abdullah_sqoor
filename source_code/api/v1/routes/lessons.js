const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const checkAuth = require("../middleware/check-auth");
const lessonsController = require("../controllers/lessons");
const Lesson = require("../models/lesson.js");

// testing routes/

// 1- create lesson
router.post("/", async (req, res) => {
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

// 2- get all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    return res.status(200).json(lessons);
  } catch (e) {
    console.log("Error retreving all lessons", e);
    return res.status(500).json("Something went wrong");
  }
});

// 3- add question
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

    const result = await Lesson.updateOne(
      { _id: lessonId },
      { $push: { questions: newQuestion } }
    );

    // if(result.n === 1 && result.nModified === 1 && result.ok === 1)
    res.status(201).json(result);
  } catch (e) {
    console.log("Error adding a question to a lesson", e);
    res.status(500).json("Error adding a question to a lesson");
  }
});

// 4- update lessons
router.put("/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;
    const updatedLesson = {
      name: req.body.name,
      image: req.body.image,
      progress: req.body.progress
    };

    const result = await Lesson.updateOne({ _id: lessonId }, updatedLesson);
    res.status(200).json(result);
  } catch (e) {
    console.log("Error updating lesson: ", e);
    res.status(500).json("Error updating lesson");
  }
});

// 5- update question
router.put("/:id/questions/:questionId", async (req, res) => {
  const lessonId = req.params.id;
  const questionId = req.params.questionId;

  const newQuestion = {
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

  const result = await Lesson.updateOne(
    { _id: lessonId, "questions._id": questionId },
    { $set: { "questions.$": newQuestion } }
  );

  return res.status(200).json(result);
});

// 6- delete lesson
router.delete("/:id", async (req, res) => {
  const lessonId = req.params.id;
  const result = await Lesson.remove({ _id: lessonId });

  return res.status(200).json(result);
});

// 7- delete question
router.delete("/:id/questions/:questionId", async (req, res) => {
  const lessonId = req.params.id;
  const questionId = req.params.questionId;

  const result = await Lesson.update(
    { _id: lessonId },
    { $pull: { questions: { _id: questionId } } }
  );

  return res.status(200).json(result);
});

// end testing

/* 
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
