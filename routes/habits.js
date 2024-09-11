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

router.get("/habits", authenticateJWT, async (req, res) => {
  const userId = req.user.id;

  try {
    const habits = await Habit.findAll({ where: { userId } });
    res.json(habits);
  } catch (error) {
    console.error("Error fetching habitS:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/habits/:id", authenticateJWT, async (req, res) => {
  const habitId = req.params.id;
  const userId = req.user.id;

  try {
    const habit = await Habit.findOne({ where: { id: habitId, userId } });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found." });
    }

    await habit.destroy();
    res.status(200).json({ message: "Habit deleted successfully." });
  } catch (error) {
    console.error("Error deleting the habit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
