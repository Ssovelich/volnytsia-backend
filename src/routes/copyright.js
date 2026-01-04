const express = require("express");
const router = express.Router();
const copyrightController = require("../controllers/copyrightController");

router.get("/:key", copyrightController.getCopyright);
router.post("/", copyrightController.updateCopyright);

module.exports = router;