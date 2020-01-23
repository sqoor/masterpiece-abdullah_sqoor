const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", usersController.singup);

router.post("/login", usersController.login);

router.delete("/:userId", checkAuth, usersController.delete);

module.exports = router;
