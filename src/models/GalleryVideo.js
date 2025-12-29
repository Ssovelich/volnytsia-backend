const mongoose = require("mongoose");

const GalleryVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryVideo", GalleryVideoSchema);