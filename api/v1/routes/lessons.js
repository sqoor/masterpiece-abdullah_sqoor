const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const ordersController = require("../controllers/lessons");

router.get("/", checkAuth, ordersController.getAll);

router.post("/", checkAuth, ordersController.create);

router.get("/:id", checkAuth, ordersController.getOne);

router.delete("/:id", checkAuth, ordersController.deleteOne);

module.exports = router;
