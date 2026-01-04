const Copyright = require("../models/Copyright");

exports.getCopyright = async (req, res) => {
  try {
    const copyright = await Copyright.findOne();
    res.json(copyright);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.updateCopyright = async (req, res) => {
  try {
    const { key, value } = req.body;
    const copyright = await Copyright.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );
    res.json(copyright);
  } catch (err) {
    res.status(500).json({ message: "Помилка при оновленні копірайту" });
  }
};