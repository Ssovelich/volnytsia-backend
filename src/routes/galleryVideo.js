const express = require("express");
const router = express.Router();
const galleryVideoController = require("../controllers/galleryVideoController");

router.get("/", galleryVideoController.getGalleryVideos);

router.post("/", galleryVideoController.createGalleryVideo);

router.delete("/:id", galleryVideoController.deleteGalleryVideo);

module.exports = router;
