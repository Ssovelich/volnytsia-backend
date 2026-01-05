const express = require("express");
const router = express.Router();
const { uploadLeaders } = require("../config/cloudinary");
const leaderController = require("../controllers/leaderController");

router.get("/", leaderController.getLeaders);

router.post("/", uploadLeaders.single("image"), leaderController.createLeader);

router.put(
  "/:id",
  uploadLeaders.single("image"),
  leaderController.updateLeader
);

router.delete("/:id", leaderController.deleteLeader);

module.exports = router;
