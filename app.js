const express = require("express");
// require("./src/db/connection");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const router = require("./src/routers/index");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/api", router);

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
