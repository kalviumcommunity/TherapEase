const express = require("express");
const router = express.Router();
const Chat = require("../Model/ChatSchema");

router.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    console.error("Error retrieving chats:", error);
    res.status(500).json({ error: "Failed to retrieve chats" });
  }
});

module.exports = router;
