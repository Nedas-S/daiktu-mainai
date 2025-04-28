const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Registracijos funkcija
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

    res.status(201).json({ message: "Registracija sėkminga", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Registracijos klaida", details: error.message });
  }
};

// Prisijungimo funkcija
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Vartotojas nerastas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Neteisingas slaptažodis" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Prisijungta sėkmingai", token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Prisijungimo klaida", details: error.message });
  }
};

// Eksportuojam funkcijas
module.exports = { registerUser, loginUser };
