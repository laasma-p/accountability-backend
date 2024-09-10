const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const habitsRoutes = require("./routes/habits");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/api", authRoutes);
app.use("/api", habitsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
