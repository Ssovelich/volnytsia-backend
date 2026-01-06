const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  full: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
});

const PhotoAlbumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    cover: {
      url: { type: String, required: true },
      cloudinary_id: { type: String, required: true },
    },
    photos: [PhotoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PhotoAlbum", PhotoAlbumSchema);
