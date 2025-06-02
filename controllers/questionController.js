const User = require('../models/User');
const question = require('../models/question');
const Question = require('../models/question');
const { encryptData, splitKey } = require('../utils/crypto');
const crypto = require('crypto');

// POST /questions/create
const createQuestion = async (req, res) => {
  try {
    const {questionid, questionText, options, createdBy } = req.body;
    console.log("Request Body:", req.body);

    // Step 1: Get the user who created the question
    const user = await User.findOne({ name: createdBy });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     // Validate input
    if (!questionid || isNaN(questionid)) {
      return res.status(400).json({ error: "Valid `questionid` is required." });
    }

    // Step 2: Generate a unique AES key for this question
    const aesKey = crypto.randomBytes(32); // 256-bit AES key

    // Step 3: Encrypt the question and options using the AES key
    const encryptedQuestion = encryptData(questionText, aesKey);
    const encryptedOptions = options.map(option => encryptData(option, aesKey));

    // Step 4: Split the AES key into shares
    const shares = splitKey(aesKey, 5, 3); // 5 shares, 3 required for decryption

    // Step 5: Save the question with encrypted data and key shares
    const questionDoc = new Question({
      questionid,
      questionText: JSON.stringify(encryptedQuestion),
      options: encryptedOptions.map(opt => JSON.stringify(opt)),
      shares, // Store the shares here
      createdBy: createdBy,
    });
    console.log(questionDoc)
    console.log(req.body)
    await questionDoc.save();

    // Step 6: Distribute the shares to the users
    const users = await User.find(); // Fetch all users from the database
    if (users.length < shares.length) {
      return res.status(400).json({ message: 'Not enough users to distribute shares' });
    }

    // Distribute the shares to users
    for (let i = 0; i < shares.length; i++) {
      const user = users[i]; // Get the user at the current index
      // user.shares.push(shares[i].toString("hex")); // Append the new key share (converted to hex)s
      user.shares.set(questionid.toString(),shares[i])
      await user.save(); // Save the updated user
    }

    res.json({ message: 'Question created successfully and shares distributed' });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question' });
  }
};

module.exports = { createQuestion };
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Question = require("../models/question");
// const { encryptData, splitKey } = require("../utils/crypto");
// const crypto = require("crypto");
// require("dotenv").config();

// // POST /questions/create
// const createQuestion = async (req, res) => {
//   try {
//     // Step 1: Get the logged-in user from the token
//     console.log(req.body)
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Authorization token required" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you set JWT_SECRET in your environment variables
//     const createdBy = decoded.name; // Assuming the user's name is stored in the token

//     // Step 2: Validate input
//     const { questionid, questionText, options } = req.body;
//     if (!questionid || isNaN(questionid)) {
//       return res.status(400).json({ error: "Valid `questionid` is required." });
//     }

//     // Step 3: Generate a unique AES key for this question
//     const aesKey = crypto.randomBytes(32); // 256-bit AES key

//     // Step 4: Encrypt the question and options using the AES key
//     const encryptedQuestion = encryptData(questionText, aesKey);
//     const encryptedOptions = options.map((option) => encryptData(option, aesKey));

//     // Step 5: Split the AES key into shares
//     const shares = splitKey(aesKey, 5, 3); // 5 shares, 3 required for decryption

//     // Step 6: Save the question with encrypted data and key shares
//     const questionDoc = new Question({
//       questionid,
//       questionText: JSON.stringify(encryptedQuestion),
//       options: encryptedOptions.map((opt) => JSON.stringify(opt)),
//       shares, // Store the shares here
//       createdBy,
//     });

//     await questionDoc.save();

//     // Step 7: Distribute the shares to the users
//     const users = await User.find(); // Fetch all users from the database
//     if (users.length < shares.length) {
//       return res.status(400).json({ message: "Not enough users to distribute shares" });
//     }

//     for (let i = 0; i < shares.length; i++) {
//       const user = users[i];
//       user.shares.set(questionid.toString(), shares[i]);
//       await user.save();
//     }

//     res.json({ message: "Question created successfully and shares distributed" });
//   } catch (error) {
//     console.error("Error creating question:", error);
//     res.status(500).json({ message: "Error creating question" });
//   }
// };

// module.exports = { createQuestion };
