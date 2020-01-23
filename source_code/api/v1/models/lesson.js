const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;