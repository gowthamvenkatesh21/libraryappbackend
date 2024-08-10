const express = require("express");
const adminmiddleware = require("../middlewares/adminmiddleware");
const {
  insertbook,
  updatebook,
  deletebook,
  getallbooks,
} = require("../controllers/bookcontroller");
const Bookrouter = express.Router();

Bookrouter.post("/insertbook", adminmiddleware, insertbook);

Bookrouter.put("/updatebook", adminmiddleware, updatebook);

Bookrouter.delete("/deletebook", adminmiddleware, deletebook);

Bookrouter.get("/getallbook", adminmiddleware, getallbooks);

module.exports = Bookrouter;
