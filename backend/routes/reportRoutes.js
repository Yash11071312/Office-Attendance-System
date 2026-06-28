const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  downloadPDF,
  downloadExcel,
} = require("../controllers/reportController");

router.get("/pdf", protect, downloadPDF);
router.get("/excel", protect, downloadExcel);

module.exports = router;