const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", BannerSchema);
