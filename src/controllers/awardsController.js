const Award = require("../models/Award");
const { cloudinary } = require("../config/cloudinary");

exports.getAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ createdAt: -1 }).select("-__v");
    res.json(awards);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.createAward = async (req, res) => {
  try {
    const mainFile = req.files['image'] ? req.files['image'][0] : null;
    if (!mainFile) return res.status(400).json({ message: "Файл не отримано" });

    const fullUrl = mainFile.path;
    const thumbUrl = req.files['thumbnail'] 
      ? req.files['thumbnail'][0].path 
      : fullUrl.replace("/upload/", "/upload/w_400,c_scale,q_auto/");

    const newAward = new Award({
      images: { thumbnail: thumbUrl, full: fullUrl },
      cloudinary_id: mainFile.filename,
    });

    await newAward.save();
    res.status(201).json(newAward);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err.message });
  }
};

exports.deleteAward = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) return res.status(404).json({ message: "Нагороду не знайдено" });

    if (award.cloudinary_id) await cloudinary.uploader.destroy(award.cloudinary_id);
    await award.deleteOne();
    res.json({ message: "Нагороду видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка видалення" });
  }
};