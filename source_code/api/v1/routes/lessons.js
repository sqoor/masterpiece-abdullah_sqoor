const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const checkAuth = require("../middleware/check-auth");
const ordersController = require("../controllers/lessons");

router.get("/", checkAuth, function(req, res) {
  const lessons = [
    {
      id: 1,
      name: "alphabets-basics",
      image: "no-image",
      progress: "100" // get from the logged user.
    },
    {
      id: 2,
      name: "alphabets-ii",
      image: "no-image",
      progress: "60" // get from the logged user.
    },
    {
      id: 3,
      name: "alphabets-advance",
      image: "no-image",
      progress: "10" // get from the logged user.
    },
    {
      id: 4,
      name: "greetings",
      image: "no-image",
      progress: "0" // get from the logged user.
    },
    {
      id: 5,
      name: "greetings",
      image: "no-image",
      progress: "0" // get from the logged user.
    },
    {
      id: 6,
      name: "greetings",
      image: "no-image",
      progress: "0" // get from the logged user.
    },
    {
      id: 7,
      name: "greetings",
      image: "no-image",
      progress: "0" // get from the logged user.
    },
    {
      id: 8,
      name: "greetings",
      image: "no-image",
      progress: "0" // get from the logged user.
    },
    {
      id: 9,
      name: "greetings",
      image: "no-image",
      progress: "0" // get from the logged user.
    }
  ];

  return res.status(200).json(lessons);
});

/* 
router.get("/", checkAuth, ordersController.getAll);
router.post("/", checkAuth, ordersController.create);
router.get("/:id", checkAuth, ordersController.getOne);
router.delete("/:id", checkAuth, ordersController.deleteOne);
 */

module.exports = router;
