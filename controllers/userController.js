const crypto = require("crypto");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

// Generate AES Encryption Key
const generateKey = () => crypto.randomBytes(32).toString("hex");

// Create a New User
const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const encryptionKey = generateKey();

    const user = new User({ name, password, encryptionKey });
    await user.save();

    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name encryptionKey");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({userId:user._id},'secret-key',{expiresIn:'24h'})

    res.status(200).json({ message: "Login successful",token, encryptionKey: user.encryptionKey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUsers, loginUser };
