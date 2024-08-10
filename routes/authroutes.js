const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registration, login } = require("../controllers/authcontroller");
const router = express.Router();

router.post("/register", registration);

router.post("/login", login);

module.exports = router;
