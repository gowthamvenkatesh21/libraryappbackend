const Book = require("../modals/bookschema");
const Borrow = require("../modals/borrowschema");

const barrowbook = async (req, res) => {
  try {
    const book = await Book.findById(req.query.bookId);
    if (!book || book.copies === 0)
      return res.status(400).json({ msg: "Book not available" });

    const borrow = new Borrow({
      user: req.user.id,
      book: book.id,
      returnDate: null,
    });
    await borrow.save();

    book.copies -= 1;
    await book.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const returnbook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.query.borrowId).populate("book");
    if (!borrow || borrow.returnDate)
      return res.status(400).json({ msg: "Invalid request" });

    borrow.returnDate = Date.now();
    await borrow.save();

    borrow.book.copies += 1;
    await borrow.book.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const borrowhistory = async (req, res) => {
  try {
    const history = await Borrow.find({ user: req.user.id }).populate("book");
    res.json(history);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = { barrowbook, returnbook, borrowhistory };
