const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

/* Initializing the path for routes */
app.use("/", require("./routes"));

/* Connected the app with mongoose */
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB!"));

/* Setting up server */
PORT = process.env.PORT || 6000;
app.listen(PORT, function () {
  console.log("This server port is up and running at PORT: " + PORT);
});
