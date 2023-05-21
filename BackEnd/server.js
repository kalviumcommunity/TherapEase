const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const WebSocket = require("ws");

const signUpMockPath = "../FrontEnd/src/Mocks/SignUpMock.json";
const therapistDetailsMock = require("../FrontEnd/src/Mocks/TherapistDetailsMock.json");
const chatMockPath = "../FrontEnd/src/Mocks/ChatMock.json";
chatMock = require(chatMockPath);

app.use(cors());
app.use(express.json());

app.get("/api/therapists", (req, res) => {
  res.json(therapistDetailsMock);
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields" });
  }

  const newAccount = { name, email, password };

  let signUpData = [];
  try {
    signUpData = require(signUpMockPath);
  } catch (err) {
    console.error("Error reading SignUpMock.json:", err);
    return res.status(500).json({ message: "Internal server error" });
  }

  signUpData.push(newAccount);

  fs.writeFile(signUpMockPath, JSON.stringify(signUpData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to SignUpMock.json:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ message: "Account created successfully" });
  });
});

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields" });
  }

  let signUpData = [];
  try {
    signUpData = require(signUpMockPath);
  } catch (err) {
    console.error("Error reading SignUpMock.json:", err);
    return res.status(500).json({ message: "Internal server error" });
  }

  const user = signUpData.find((account) => account.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const secretKey = process.env.JWT_SECRET
  const payload = { name: user.name, email: user.email };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secretKey, options);

  res.json({ message: "Sign in successful", token: token });
});

app.post("/api/saveChat", (req, res) => {
  const chatData = req.body;
  fs.writeFile(chatMockPath, JSON.stringify(chatData, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).json({ error: "Failed to save chat" });
    } else {
      res.json({ message: "Chat saved successfully" });
    }
  });
});

app.post("/api/addChat", (req, res) => {
  const chatData = req.body;
  const existingChat = chatMock.find(
    (chat) =>
      (chat.user1_id === chatData.user1_id &&
        chat.user2_id === chatData.user2_id) ||
      (chat.user1_id === chatData.user2_id &&
        chat.user2_id === chatData.user1_id)
  );

  if (existingChat) {
    return res.status(400).json({ message: "Chat already exists" });
  }

  fs.readFile(chatMockPath, (readErr, data) => {
    if (readErr) {
      console.error("Error reading ChatMock.json:", readErr);
      return res.status(500).json({ message: "Internal server error" });
    }

    let chatMockData;
    try {
      chatMockData = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing ChatMock.json:", parseErr);
      return res.status(500).json({ message: "Internal server error" });
    }

    chatMockData.push(chatData);

    fs.writeFile(
      chatMockPath,
      JSON.stringify(chatMockData, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing to ChatMock.json:", writeErr);
          return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json({ message: "Chat added successfully" });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});

const wss = new WebSocket.Server({
  port: 2507,
});

wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    ws.send(data);
  });
});
