const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

// get method to get the Profile
router.post("/", async (req, res) => {

  try {
    const data = req.body;

    // const existingData = await User.findOne({ data });
    // if (existingUser) {
    //   return
    // }

    const userProfile = new Profile(data);
    const response = await userProfile.save();
    console.log("update user");
    res.status(200).json(response);


  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

// get method to get the Profile
router.get("/", async (req, res) => {
  try {
    const response = await Profile.find();
    console.log("data fetched successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
