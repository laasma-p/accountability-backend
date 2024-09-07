const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user." });
  }
});

module.exports = router;
