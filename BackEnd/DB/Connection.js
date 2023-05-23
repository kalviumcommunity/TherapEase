const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const DB_URI = process.env.DATABASE_URI;
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
