const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");

const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.BACKEND_PORT || 8080;

app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => console.log("✅ db conn success"))
  .catch(() => console.log("❌ db conn failed"));

app.use(express.json()); // parse json
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // exact frontend URL
    credentials: true,
  })
);

// routes
app.use("/", router);

// set up server
app.listen(PORT, () => {
  console.log(`server active, port ${PORT}... 👂`);
});
