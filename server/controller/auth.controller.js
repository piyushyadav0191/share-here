const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, "piyushisverycool", {
    expiresIn: "1h",
  });
}

exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = generateToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json(error);
  }
};
