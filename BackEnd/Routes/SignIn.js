const express = require("express");
const router = express.Router();
const User = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const secretKey = process.env.JWT_SECRET;
    const payload = { name: user.name, email: user.email, _id:user._id };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secretKey, options);

    res.json({ message: "Sign in successful", token: token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
