const GalleryVideo = require("../models/GalleryVideo");

exports.getGalleryVideos = async (req, res) => {
  try {
    const videos = await GalleryVideo.find()
      .sort({ order: 1, createdAt: -1 })
      .select("-__v");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.createGalleryVideo = async (req, res) => {
  try {
    const { title, url, order } = req.body;

    const newVideo = new GalleryVideo({
      title,
      url,
      order: order || 0,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера", error: err.message });
  }
};

exports.updateGalleryVideo = async (req, res) => {
  try {
    const { title, url, order } = req.body;
    const { id } = req.params;

    const updatedVideo = await GalleryVideo.findByIdAndUpdate(
      id,
      {
        title,
        url,
        order: order !== undefined ? order : 0,
      },
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Відео не знайдено" });
    }

    res.json(updatedVideo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Помилка при оновленні відео", error: err.message });
  }
};

exports.deleteGalleryVideo = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Відео не знайдено" });

    await video.deleteOne();
    res.json({ message: "Відео видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка видалення" });
  }
};
