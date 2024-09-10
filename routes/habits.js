const express = require("express");
const router = express.Router();
const Habit = require("../models/habit");
const authenticateJWT = require("../middleware/jwt");

router.post("/habits", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ error: "Habit name is required." });
  }

  try {
    const habit = await Habit.create({ name, userId });
    res.status(201).json(habit);
  } catch (error) {
    console.error("Error creating a habit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
