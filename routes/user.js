const express = require("express");
const { createUser, getUsers, loginUser } = require("../controllers/userController");
const {completeRequest} =require("../controllers/completeRequest")

const router = express.Router();

// Create a new user
router.post("/create", createUser);
router.post("/complete-request", completeRequest)
// Get all users
router.get("/", getUsers);

// User login
router.post("/login", loginUser);

module.exports = router;
