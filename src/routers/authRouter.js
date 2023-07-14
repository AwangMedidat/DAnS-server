const router = require("express").Router();
const express = require("express");
const app = express()
const authController = require("../controllers/authController");


app.post("/login", authController.login);
app.post("/register", authController.register);


module.exports = app;
