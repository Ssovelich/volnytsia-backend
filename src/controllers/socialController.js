const Social = require("../models/Social");

exports.getSocials = async (req, res) => {
  try {
    const socials = await Social.find().sort({ order: 1, createdAt: -1 });
    res.json(socials);
  } catch (err) {
    res.status(500).json({ message: "Помилка при отриманні соцмереж" });
  }
};

exports.createSocial = async (req, res) => {
  try {
    const newSocial = new Social(req.body);
    await newSocial.save();
    res.status(201).json(newSocial);
  } catch (err) {
    res.status(500).json({ message: "Помилка при створенні посилання" });
  }
};

exports.updateSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSocial = await Social.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedSocial) {
      return res.status(404).json({ message: "Посилання не знайдено" });
    }

    res.json(updatedSocial);
  } catch (err) {
    res.status(500).json({ message: "Помилка при оновленні посилання" });
  }
};

exports.deleteSocial = async (req, res) => {
  try {
    await Social.findByIdAndDelete(req.params.id);
    res.json({ message: "Посилання видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка при видаленні" });
  }
};