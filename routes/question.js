const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const {encryptData,decryptData,splitKey,combineKey} = require("../utils/crypto");
console.log(typeof encryptData);
const Question = require("../models/question");
const {createQuestion} = require('../controllers/questionController')
const {authenticate} = require("../midelleware/userlogin")
router.post("/create",createQuestion)
// Create and Encrypt Question
// router.post("/create", async (req, res) => {
//   const { question, options } = req.body;

//   // Generate AES key
//   const aesKey = crypto.randomBytes(32);

//   // Encrypt question and options
//   const encryptedQuestion = encryptData(question, aesKey);
//   const encryptedOptions = options.map((option) => encryptData(option, aesKey));

//   // Split AES key using SSS
//   const shares = splitKey(aesKey, 3, 2); // 3 shares, 2 required for decryption

//   // Save to database
//   const questionDoc = new Question({
//     questionText: JSON.stringify(encryptedQuestion),
//     options: encryptedOptions.map((opt) => JSON.stringify(opt)),
//     shares,
//   });

//   await questionDoc.save();
//   res.json({ message: "Question created successfully", shares });
// });

// Decrypt Question
// router.post("/decrypt/:id", async (req, res) => {
//   const { id } = req.params;
//   const { shares } = req.body;

//   // Fetch question
//   const question = await Question.findById(id);
//   if (!question) return res.status(404).json({ error: "Question not found" });

//   // Combine shares to reconstruct key
//   try {
//     const combinedKey = combineKey(shares);

//     // Decrypt question and options
//     const decryptedQuestion = decryptData(
//       JSON.parse(question.questionText),
//       combinedKey
//     );
//     const decryptedOptions = question.options.map((option) =>
//       decryptData(JSON.parse(option), combinedKey)
//     );

//     res.json({
//       question: decryptedQuestion,
//       options: decryptedOptions,
//     });
//   } catch (err) {
//     res
//       .status(400)
//       .json({ error: "Failed to decrypt. Ensure valid shares are provided." });
//   }
// });
router.post("/decrypt/:id", async (req, res) => {
  const { id } = req.params; // Extract `id` from URL
  const { shares } = req.body;

  // Convert `id` to a number to match the `questionid` field type
  const questionId = parseInt(id, 10);
  console.log(req.body,'--------------------------')
  // Validate the converted ID
  if (isNaN(questionId)) {
    return res.status(400).json({ error: "Invalid Question ID format." });
  }

  try {
    // Fetch the question using `questionid`
    const question = await Question.findOne({ questionid: questionId });
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Combine shares to reconstruct the key
    const combinedKey = combineKey(shares);

    // Decrypt the question and options
    const decryptedQuestion = decryptData(
      JSON.parse(question.questionText),
      combinedKey
    );
    const decryptedOptions = question.options.map((option) =>
      decryptData(JSON.parse(option), combinedKey)
    );

    // Respond with the decrypted data
    res.json({
      question: decryptedQuestion,
      options: decryptedOptions,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to decrypt. Ensure valid shares are provided." });
  }
});

module.exports = router;
