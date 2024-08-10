const Book = require("../modals/bookschema");
const Borrow = require("../modals/borrowschema");

const mostborrow = async (req, res) => {
  try {
    const mostBorrowed = await Borrow.aggregate([
      { $group: { _id: "$book", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      { $project: { "book.title": 1, "book.author": 1, count: 1 } },
    ]);
    res.json(mostBorrowed);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const activemembers = async (req, res) => {
  try {
    const activeMembers = await Borrow.aggregate([
      { $group: { _id: "$user", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { "user.name": 1, "user.email": 1, count: 1 } },
    ]);
    res.json(activeMembers);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const bookavailability = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const borrowedBooks = await Borrow.countDocuments({ returnDate: null });
    const availableBooks = totalBooks - borrowedBooks;

    res.json({ totalBooks, borrowedBooks, availableBooks });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = { bookavailability, activemembers, mostborrow };
