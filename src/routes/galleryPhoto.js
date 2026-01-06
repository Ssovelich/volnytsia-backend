const express = require("express");
const router = express.Router();
const { uploadGallery } = require("../config/cloudinary");
const galleryPhotoController = require("../controllers/galleryPhotoController");

router.get("/", galleryPhotoController.getAlbums);

router.post(
  "/",
  uploadGallery.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 50 },
  ]),
  galleryPhotoController.createAlbum
);

router.patch(
  "/:id",
  uploadGallery.fields([{ name: "cover", maxCount: 1 }]),
  galleryPhotoController.updateAlbum
);

router.delete("/:id", galleryPhotoController.deleteAlbum);

module.exports = router;
