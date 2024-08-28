const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const bcryptjs = require("bcryptjs");
const { jwtAuthMiddleware, generateToken } = require("./../auth");
require("dotenv").config();

// POST route to add a person
router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body; //assuming the req.body contains the person data

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create a new user document using the mongoose model
    const newUser = new User({
      name,
      email,
      password,
    });

    // save the new person to the database
    await newUser.save();
    console.log("data saved");

    // Create and assign token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      res.status(400).json({ err: 'Invalid request data' });
    } else {
      res.status(500).json({ err: 'Server Error' });
    }
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Please register yourself first" });
    }

    // Check password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and assign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token", token);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Profile route
router.post("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const userProfile = new Profile(user);
    const response = await userProfile.save();
    console.log("update user");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const response = await Profile.find(userId);
    console.log("data fetched successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract the id from the token
    const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

    // Check if currentPassword and newPassword are present in the request body
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both currentPassword and newPassword are required" });
    }

    // Find the user by userID
    const user = await User.findById(userId);

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;