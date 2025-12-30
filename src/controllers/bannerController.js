const Banner = require("../models/Banner");
const cloudinary = require("cloudinary").v2;

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера при отриманні банерів" });
  }
};

exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Будь ласка, завантажте зображення" });
    }

    const { order } = req.body;

    const newBanner = new Banner({
      image: req.file.path,     
      cloudinary_id: req.file.filename,
      order: order || 0,
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ message: "Помилка при створенні банера", error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { order } = req.body;
    let banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Слайд не знайдено" });
    }

    let updateData = { order: order || 0 };

    if (req.file) {
      await cloudinary.uploader.destroy(banner.cloudinary_id);
      updateData.image = req.file.path;
      updateData.cloudinary_id = req.file.filename;
    }

    banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: "Помилка при оновленні банера", error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Слайд не знайдено" });
    }

    if (banner.cloudinary_id) {
      await cloudinary.uploader.destroy(banner.cloudinary_id);
    }

    await banner.deleteOne();
    res.json({ message: "Слайд та зображення успішно видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка при видаленні банера" });
  }
};