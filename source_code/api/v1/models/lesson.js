const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  progress: { type: Number },
  questions: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      language: {
        question: {
          type: String,
          enum: ["ar", "en"],
          required: true
        },
        answer: {
          type: String,
          enum: ["ar", "en"],
          required: true
        }
      },

      formate: {
        type: String,
        enum: ["text", "audio", "video"],
        required: true
      },

      type: {
        type: String,
        enum: ["make-sentence", "fill-blank", "multiple-choice"],
        required: true
      },
      question: {
        type: String,
        required: true
      },
      choices: {
        type: [String],
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ]
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
