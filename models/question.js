const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionid: { type: Number, unique: true, required: true }, // Add integer ID
  questionText: String, // Encrypted question
  options: [String], // Encrypted options
  createdBy: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  shares : [String]
});


module.exports = mongoose.model("Question", QuestionSchema);
