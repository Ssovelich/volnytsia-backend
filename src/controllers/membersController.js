const Member = require("../models/Member");
const { cloudinary } = require("../config/cloudinary");

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ order: 1, createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Помилка отримання даних" });
  }
};

exports.createMember = async (req, res) => {
  try {
    const { name, surname, role, order } = req.body;
    
    const newMember = new Member({
      name,
      surname,
      role,
      order: Number(order) || 0,
      image: req.file ? req.file.path : "/default-avatar.png",
      cloudinary_id: req.file ? req.file.filename : null,
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: "Помилка створення", error: err.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { name, surname, role, order } = req.body;
    const updateData = { name, surname, role, order: Number(order) || 0 };

    if (req.file) {
      const member = await Member.findById(req.params.id);
      if (member?.cloudinary_id)
        await cloudinary.uploader.destroy(member.cloudinary_id);
      updateData.image = req.file.path;
      updateData.cloudinary_id = req.file.filename;
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: "Помилка оновлення" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (member?.cloudinary_id)
      await cloudinary.uploader.destroy(member.cloudinary_id);
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Видалено" });
  } catch (err) {
    res.status(500).json({ message: "Помилка видалення" });
  }
};
