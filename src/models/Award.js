const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema(
  {
    images: {
      thumbnail: { type: String, required: true },
      full: { type: String, required: true },
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    alt: { type: String, default: "Нагорода" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Award", AwardSchema);
