const mongoose = require("mongoose");

const leaderSchems = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    middle_name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    source: { type: String },
    cloudinary_id: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leader", leaderSchems);