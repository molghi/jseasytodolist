const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.BACKEND_PORT || 8080;
const router = require("./routes/routes");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => console.log("✅ db conn success"))
  .catch(() => console.log("❌ db conn failed"));

app.use(express.json()); // parse json
app.use(cors());

// routes
app.use("/", router);

// set up server
app.listen(PORT, () => {
  console.log(`server active on port ${PORT}... 👂`);
});
