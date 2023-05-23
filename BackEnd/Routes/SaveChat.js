const express = require("express");
const router = express.Router();
const Chat = require("../Model/ChatSchema");

router.post("/saveChat", async (req, res) => {
  const chatData = req.body;
  const { user1Name, user2Name, newMessage } = chatData;

  try {
    let chat = await Chat.findOne({
      $or: [
        { user1_id: user1Name, user2_id: user2Name },
        { user1_id: user2Name, user2_id: user1Name },
      ],
    });

    chat.messages.push(newMessage);

    await chat.save();
    res.json({ message: "Chat saved successfully" });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

module.exports = router;
