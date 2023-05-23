const express = require("express");
const router = express.Router();
const Therapist = require ("../Model/TherapistSchema.js")

router.get("/therapists", async(req, res) => {
  try {
    const therapists = await Therapist.find({});
    res.json(therapists);
  } catch (error) {
    console.error("Error retrieving therapists:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
