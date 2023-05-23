const express = require("express");
const router = express.Router();
const Chat = require("../Model/ChatSchema");

router.post("/addChat", async (req, res) => {
  const chatData = req.body;

  try {
    const existingChat = await Chat.findOne({
      $or: [
        {
          user1_id: chatData.user1_id,
          user2_id: chatData.user2_id,
        },
        {
          user1_id: chatData.user2_id,
          user2_id: chatData.user1_id,
        },
      ],
    });

    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists" });
    }

    const chat = new Chat(chatData);
    await chat.save();
    res.status(200).json({ message: "Chat added successfully" });
  } catch (error) {
    console.error("Error adding chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
