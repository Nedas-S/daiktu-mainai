const bcrypt = require("bcrypt");
const { User } = require("../models");

const registerUser = async (req, res) => {
  const { username, email, password, location } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password_hash: hash,
      location,
    });

    res.status(201).json({
      message: "Registracija sėkminga",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Registracijos klaida",
      details: error.message,
    });
  }
};

module.exports = { registerUser };
