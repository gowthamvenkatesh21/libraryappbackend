const express = require("express");
const {
  barrowbook,
  returnbook,
  borrowhistory,
} = require("../controllers/borrowcontroller");
const membermiddleware = require("../middlewares/membermiddleware");

const Memberrouter = express.Router();

Memberrouter.post("/borrowbook", membermiddleware, barrowbook);

Memberrouter.post("/returnbook", membermiddleware, returnbook);

Memberrouter.get("/history", membermiddleware, borrowhistory);

module.exports = Memberrouter;
