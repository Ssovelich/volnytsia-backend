const PhotoAlbum = require("../models/PhotoAlbum");
const { cloudinary } = require("../config/cloudinary");

exports.getAlbums = async (req, res) => {
  try {
    const albums = await PhotoAlbum.find()
      .sort({ order: 1, createdAt: -1 })
      .select("-__v");
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const { title, order } = req.body;
    const coverFile = req.files["cover"] ? req.files["cover"][0] : null;
    const photoFiles = req.files["images"] || [];

    if (!coverFile)
      return res.status(400).json({ message: "Обкладинка обов'язкова" });

    const coverData = {
      url: coverFile.path.replace(
        "/upload/",
        "/upload/w_800,h_600,c_fill,g_auto,f_auto,q_auto:good/"
      ),
      cloudinary_id: coverFile.filename,
    };

    const photosData = photoFiles.map((file) => ({
      full: file.path,
      thumbnail: file.path.replace(
        "/upload/",
        "/upload/w_600,h_450,c_fill,g_auto,f_auto,q_auto:good/"
      ),
      cloudinary_id: file.filename,
    }));

    const newAlbum = new PhotoAlbum({
      title,
      order: order || 0,
      cover: coverData,
      photos: photosData,
    });

    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).json({ message: "Помилка створення", error: err.message });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const { title, order } = req.body;

    const album = await PhotoAlbum.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Альбом не знайдено" });
    }

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (order !== undefined) updateFields.order = Number(order);

    if (req.files && req.files["cover"] && req.files["cover"][0]) {
      const coverFile = req.files["cover"][0];

      if (album.cover && album.cover.cloudinary_id) {
        try {
          await cloudinary.uploader.destroy(album.cover.cloudinary_id);
        } catch (err) {
          console.error("Cloudinary delete cover error:", err.message);
        }
      }

      updateFields.cover = {
        url: coverFile.path.replace(
          "/upload/",
          "/upload/w_800,h_600,c_fill,g_auto,f_auto,q_auto:good/"
        ),
        cloudinary_id: coverFile.filename,
      };
    }

    let newPhotosData = [];
    if (req.files && req.files["images"] && req.files["images"].length > 0) {
      newPhotosData = req.files["images"].map((file) => ({
        full: file.path,
        thumbnail: file.path.replace(
          "/upload/",
          "/upload/w_600,h_450,c_fill,g_auto,f_auto,q_auto:good/"
        ),
        cloudinary_id: file.filename,
      }));
    }

    const updateQuery = { $set: updateFields };

    if (newPhotosData.length > 0) {
      updateQuery.$push = {
        photos: {
          $each: newPhotosData,
          $position: 0,
        },
      };
    }

    const updatedAlbum = await PhotoAlbum.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      { new: true, runValidators: true }
    );

    res.json(updatedAlbum);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Помилка сервера при додаванні фото",
      error: err.message,
    });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const album = await PhotoAlbum.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Альбом не знайдено" });

    const idsToDelete = [
      album.cover.cloudinary_id,
      ...album.photos.map((p) => p.cloudinary_id),
    ];

    await Promise.all(idsToDelete.map((id) => cloudinary.uploader.destroy(id)));
    await album.deleteOne();

    res.json({ message: "Альбом видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка видалення" });
  }
};
