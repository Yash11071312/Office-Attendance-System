const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/employees",
  upload.single("file"),
  importEmployees
);

module.exports = router;