// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title Is Required"] },
  author: { type: String, required: [true, "Author Is Required"] },
  ISBN: {
    type: String,
    required: [true, "ISBN Is Required"],
    unique: [true, "ISBN Should Be Unique"],
  },
  publicationDate: { type: Date },
  genre: { type: String },
  copies: { type: Number, required: [true, "Copies Is Required"], min: 0 },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
