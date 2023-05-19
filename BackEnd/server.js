const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken")
const crypto = require('crypto');

const signUpMockPath = "../FrontEnd/src/Mocks/SignUpMock.json";
const therapistDetailsMock = require("../FrontEnd/src/Mocks/TherapistDetailsMock.json");

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

  const secretKey = crypto.randomBytes(32).toString('hex');
  const payload = { userId: user.id, email: user.email };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secretKey, options);

  res.json({ message: "Sign in successful", token: token });
});


app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});
