const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
require('dotenv').config({ path: "../.env" });
const WebSocket = require("ws");
const dbConnection = require("./DB/Connection");

app.use(cors());
app.use(express.json());

const therapistsRouter = require("./Routes/Therapist");
app.use("/api", therapistsRouter);

const signUpRouter = require("./Routes/SignUp");
app.use("/api", signUpRouter);

const signInRouter = require("./Routes/SignIn");
app.use("/api", signInRouter);

const saveChatRouter = require("./Routes/SaveChat");
app.use("/api", saveChatRouter);

const addChatRouter = require("./Routes/AddChat");
app.use("/api", addChatRouter);

const chatsRouter = require("./Routes/Chats");
app.use("/api", chatsRouter);

app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});


const wss = new WebSocket.Server({ port: 2507 });

wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    ws.send(data);
  });
});
