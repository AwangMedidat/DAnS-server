const router = require("express").Router();
const express = require("express");
const app = express()
const jobController = require("../controllers/jobController");
const authorization = require('../middleware/authorization')

app.use(authorization)
app.get("/:id", jobController.getJobById);
app.get("/", jobController.getJob);


module.exports = app;
