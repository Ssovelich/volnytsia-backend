const express = require("express");
const router = express.Router();
const { uploadMembers } = require("../config/cloudinary");
const membersController = require("../controllers/membersController");

router.get("/", membersController.getMembers);

router.post("/", uploadMembers.single("image"), membersController.createMember);

router.put(
  "/:id",
  uploadMembers.single("image"),
  membersController.updateMember
);

router.delete("/:id", membersController.deleteMember);

module.exports = router;
