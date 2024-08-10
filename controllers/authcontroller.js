const User = require("../modals/userschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registration = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password, role: role });
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(payload);
    return res.status(200).send({
      message: "User Registration Done",
      status: 200,
      data: payload,
      toke: token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors });
    } else if (error.code === 11000) {
      return res.status(400).json({ errors: ["Email already exists"] });
    }
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, payload });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ errors });
    } else if (error.code === 11000) {
      return res.status(400).json({ errors: ["Email already exists"] });
    }
    res.status(500).send("Server error");
  }
};

module.exports = { registration, login };
