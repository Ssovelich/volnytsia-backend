const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const awardsController = require("../controllers/awardsController");

router.get("/", awardsController.getAwards);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  awardsController.createAward
);

router.delete("/:id", awardsController.deleteAward);

module.exports = router;
