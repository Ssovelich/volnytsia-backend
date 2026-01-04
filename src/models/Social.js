const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema({
  href: { type: String, required: true },
  icon: { type: String, required: true },
  alt: { type: String, required: true },
  order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Social", SocialSchema);
