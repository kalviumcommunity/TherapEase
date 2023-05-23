const express = require("express");
const router = express.Router();
const User = require("../Model/UserSchema");

router.post("/findName", async (req, res) => {
  const { id } = req.body;

  try {
    let user = await User.findOne({ _id: id });
    if (user) {
      res.json({ name: user.name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

module.exports = router;