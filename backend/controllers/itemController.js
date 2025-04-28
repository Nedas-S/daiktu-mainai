// backend/controllers/itemController.js
const { Item } = require("../models");

// Daikto sukūrimas
const createItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    // Iš failų gauname tik pavadinimus
    const filenames = req.files.map((f) => f.filename);

    // Įrašome JSON masyvą į DB
    const newItem = await Item.create({
      title,
      description,
      images: JSON.stringify(filenames),
    });

    // Susikuriame host'ą, kad formuotume pilną URL
    const host = `${req.protocol}://${req.get("host")}`;
    const imageUrls = filenames.map((fn) => `${host}/uploads/${fn}`);

    res.status(201).json({
      message: "Daiktas įkeltas su nuotraukomis",
      item: {
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        imageUrls,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Nepavyko įkelti daikto", details: error.message });
  }
};

// Daiktų sąrašo gavimas
const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();

    // Kuriame host address
    const host = `${req.protocol}://${req.get("host")}`;

    const formattedItems = items.map((item) => {
      // Iš DB gauname JSON tekstą, perkoduojame į masyvą
      const filenames = item.images ? JSON.parse(item.images) : [];
      // Kiekvieną pavadinimą paverčiame pilnu URL
      const imageUrls = filenames.map((fn) => `${host}/uploads/${fn}`);

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrls,
      };
    });

    res.status(200).json(formattedItems);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Nepavyko gauti daiktų sąrašo", details: error.message });
  }
};

// Daikto trynimas (be pakeitimų)
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: "Daiktas nerastas" });

    await item.destroy();
    res.status(200).json({ message: "Daiktas ištrintas sėkmingai" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Klaida trynimo metu", details: error.message });
  }
};

module.exports = { createItem, getItems, deleteItem };
