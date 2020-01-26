const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, function(req, res) {
  return res.status(200).json({ message: "authenticated", user: req.userData });
});

module.exports = router;
