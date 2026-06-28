const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const {
  importEmployees,
} = require("../controllers/importController");

router.post(
  "/employees",
  upload.single("file"),
  importEmployees
);

module.exports = router;