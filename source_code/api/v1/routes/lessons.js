const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const {
  createLesson,
  getLessons,
  getOneLesson,
  addQuestion,
  updateLesson,
  updateQuestion,
  deleteLesson,
  deleteQuestion
} = require("../controllers/lessons");

router.post("/", createLesson);
router.get("/", getLessons);
router.get("/:id", getOneLesson);
router.post("/:id/question", addQuestion);
router.put("/:id", updateLesson);
router.put("/:id/questions/:questionId", updateQuestion);
router.delete("/:id", deleteLesson);
router.delete("/:id/questions/:questionId", deleteQuestion);

module.exports = router;

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
