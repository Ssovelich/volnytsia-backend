const Leader = require('../models/Leader');
const cloudinary = require('../config/cloudinary');

exports.getLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ order: 1, createdAt: -1 });
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання даних' });
  }
};

exports.createLeader = async (req, res) => {
  try {
    const { name, surname, middle_name, role, description, source, order } = req.body;

    const newLeader = new Leader({
      name,
      surname,
      middle_name,
      role,
      description,
      source,
      order: Number(order) || 0,
      image: req.file ? req.file.path : '/default-avatar.png',
      cloudinary_id: req.file ? req.file.filename : null,
    });
    await newLeader.save();
    res.status(201).json(newLeader);
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення', error: err.message });
  }
};

exports.updateLeader = async (req, res) => {
  try {
    const { name, surname, middle_name, role, description, source, order } = req.body;
    const updateData = {
      name,
      surname,
      middle_name,
      role,
      description,
      source,
      order: Number(order) || 0,
    };

    if (req.file) {
      const leader = await Leader.findById(req.params.id);
      if (leader?.cloudinary_id)
        await cloudinary.uploader.destroy(leader.cloudinary_id);
      updateData.image = req.file.path;
      updateData.cloudinary_id = req.file.filename;
    }

    const updatedLeader = await Leader.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedLeader);
  } catch (err) {
    res.status(500).json({ message: 'Помилка оновлення' });
  }
};

exports.deleteLeader = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (leader?.cloudinary_id)
      await cloudinary.uploader.destroy(leader.cloudinary_id);
    await Leader.findByIdAndDelete(req.params.id);
    res.json({ message: 'Видалено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка видалення' });
  }
};