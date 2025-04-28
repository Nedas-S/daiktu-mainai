const { Item } = require("../models");

// Daikto sukūrimas
const createItem = async (req, res) => {
  const { title, description } = req.body;

  try {
    const images = req.files.map(file => file.filename);

    const newItem = await Item.create({
      title,
      description,
      images: JSON.stringify(images) //  Įrašom kaip tekstą
    });

    res.status(201).json({ message: "Daiktas įkeltas su nuotraukomis", item: newItem });
  } catch (error) {
    res.status(500).json({ error: "Nepavyko įkelti daikto", details: error.message });
  }
};

// Daiktų sąrašo gavimas
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();

    const formattedItems = items.map(item => ({
      ...item.toJSON(),
      images: item.images ? JSON.parse(item.images) : []
    }));

    res.status(200).json(formattedItems);
  } catch (error) {
    res.status(500).json({ error: "Nepavyko gauti daiktų sąrašo", details: error.message });
  }
};

//  Daikto trynimas
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "Daiktas nerastas" });
    }

    await item.destroy();
    res.status(200).json({ message: "Daiktas ištrintas sėkmingai" });
  } catch (error) {
    res.status(500).json({ error: "Klaida trynimo metu", details: error.message });
  }
};

//  Eksportuoja visas 3 funkcijas
module.exports = { createItem, getItems, deleteItem };
