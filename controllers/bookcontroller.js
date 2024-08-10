const Book = require("../modals/bookschema");

const insertbook = async (req, res) => {
  const { title, author, ISBN, publicationDate, genre, copies } = req.body;
  try {
    const book = new Book({
      title,
      author,
      ISBN,
      publicationDate,
      genre,
      copies,
    });
    await book.save();
    res.json(book);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors });
    } else if (error.name == "MongoServerError") {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        errors: [
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } '${value}' is already taken`,
        ],
      });
    }
    console.log(error.name);
    res.status(500).send(error);
  }
};

const updatebook = async (req, res) => {
  try {
    console.log(req.query);

    let book = await Book.find({ _id: req.query.id });

    if (!book) return res.status(404).json({ msg: "Book not found" });

    book = await Book.findByIdAndUpdate(req.query.id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors });
    } else if (error.name == "MongoServerError") {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        errors: [
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } '${value}' is already taken`,
        ],
      });
    }
    res.status(500).send("Server error");
  }
};

const deletebook = async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.query.id });
    console.log(book);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    await Book.deleteOne();
    res.json({ msg: "Book removed" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors });
    }
    res.status(500).send("Server error");
  }
};

const getallbooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, author } = req.query;
    const query = {};

    if (genre) query.genre = genre;
    if (author) query.author = author;

    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors });
    }
    res.status(500).send("Server error");
  }
};

module.exports = { insertbook, updatebook, getallbooks, deletebook };
