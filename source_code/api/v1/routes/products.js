const express = require("express");
const router = express.Router();
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");
const productsController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    // accept file
    // cb(new Error('image type must be .jpg or .png'), true);
    cb(null, true);
  } else {
    // reject file
    cb(null, false);
  }
};

const upload = multer({
  storage
  // limits: { fileSize: 1024 * 1024 * 10 },
  // fileFilter
});

router.get("/", productsController.getAll);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productsController.create
);

router.get("/:id", productsController.getOne);

router.patch("/:id", checkAuth, productsController.updateOne);

router.delete("/:id", checkAuth, productsController.deleteOne);

module.exports = router;
