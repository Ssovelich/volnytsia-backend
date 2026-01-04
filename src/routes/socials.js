const express = require("express");
const router = express.Router();
const socialController = require("../controllers/socialController");

router.get("/", socialController.getSocials);
router.post("/", socialController.createSocial);
router.put("/:id", socialController.updateSocial);
router.delete("/:id", socialController.deleteSocial);

module.exports = router;
