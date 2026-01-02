const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const { uploadBanners } = require("../config/cloudinary");

router.get("/", bannerController.getBanners);
router.post("/", uploadBanners.single("image"), bannerController.createBanner);
router.put("/:id", uploadBanners.single("image"), bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
