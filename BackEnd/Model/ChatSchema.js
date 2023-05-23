const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender_id: String,
  receiver_id: String,
  message_date: String,
  message_time: String,
  message_text: String,
});

const chatSchema = new mongoose.Schema({
  user1_id: String,
  user2_id: String,
  is_chat_deleted: Boolean,
  messages: [messageSchema],
});

const chat = mongoose.model("chats", chatSchema);


module.exports = chat;
