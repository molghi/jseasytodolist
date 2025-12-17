const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config({ path: "../.env" });
const PORT = process.env.BACKEND_PORT || 8080;
const router = require("./routes/routes");

app.use(express.json()); // parse json
app.use(cors());

// routes
app.use("/", router);

// set up server
app.listen(PORT, () => {
  console.log(`server active on port ${PORT}...`);
});
