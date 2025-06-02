const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/question");
const userRoutes = require("./routes/user");
const path = require("path");
const Request = require("./models/request")
const User = require("./models/User")
const app = express();
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/examdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/questions", questionRoutes);
app.use("/users", userRoutes);

app.post('/request-decrypt', async (req, res) => {
  try {
    console.log(req.body)
    const { questionid, requesterName } = req.body;

    // Step 1: Find the user based on their name
    const user = await User.findOne({ name: requesterName });
    if (!user) {
      return res.status(404).json({ message: 'Requester not found' });
    }

    // Step 2: Check if the request already exists
    const existingRequest = await Request.findOne({ questionid, requester: user._id });
    if (existingRequest) {
      return res.status(400).json({ message: 'Request already exists for this user and question.' });
    }

    // Step 3: Create a new request
    const newRequest = new Request({
      questionid,
      requester: user._id, // Use the user's ObjectId
    });

    await newRequest.save();

    res.status(200).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Error creating request' });
  }
})

app.get('/request/:questionid', async (req, res) => {
  const { questionid } = req.params;
  const request = await Request.findOne({ questionid });
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  res.json(request);
});

app.post('/provide-share', async (req, res) => {
  const { requestId, share } = req.body;
  const user = req.user; // Assume the user is authenticated

  const request = await Request.findById(requestId);
  if (!request) {
    return res.status(404).send('Request not found.');
  }

  // Check if user has the share for the question
  if (!user.shares.has(request.questionid)) {
    return res.status(400).send('You do not have a share for this question.');
  }

  // Save the share to the request
  request.sharesReceived.set(user._id.toString(), share);
  await request.save();

  // Check if enough shares are collected
  if (request.sharesReceived.size >= question.requiredShares) {
    request.status = 'Completed';

    // Decrypt the question (e.g., call a function here)
    const decryptedContent = decryptQuestion(
      question.encryptedContent,
      Array.from(request.sharesReceived.values()) // Pass collected shares
    );

    // Update the question with decrypted content (if needed)
    // await Question.findByIdAndUpdate(request.questionid, { decryptedContent });

    res.status(200).send('Decryption completed: ' + decryptedContent);
  } else {
    res.status(200).send('Share added. Waiting for more shares.');
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
