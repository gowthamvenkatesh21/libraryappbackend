const express = require("express");
const adminmiddleware = require("../middlewares/adminmiddleware");
const {
  mostborrow,
  activemembers,
  bookavailability,
} = require("../controllers/reports");

const Reportsrouter = express.Router();

Reportsrouter.get("/most-borrowed", adminmiddleware, mostborrow);

Reportsrouter.get("/active-members", adminmiddleware, activemembers);

Reportsrouter.get("/book-availability", adminmiddleware, bookavailability);

module.exports = Reportsrouter;
