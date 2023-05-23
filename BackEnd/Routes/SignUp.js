const express = require("express");
const router = express.Router();
const User = require("../Model/UserSchema");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields" });
  }

  const newAccount = { name, email, password };

  try {
    const user = new User(newAccount);
    await user.save();
    res.json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
