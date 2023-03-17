const express = require("express");
const {
  generateImage,
  variationImage,
  editImage,
} = require("../controllers/openaiController");

const router = express.Router();

router.post("/generateimage", generateImage);
router.post("/variationimage", variationImage);
router.post("/editimage", editImage);

module.exports = router;
