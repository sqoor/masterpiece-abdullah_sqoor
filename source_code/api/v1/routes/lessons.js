const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const lessonsController = require("../controllers/lessons");

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
