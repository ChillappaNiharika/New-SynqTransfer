const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = require("../middlewares/upload");
const fileController = require("../controllers/fileController");

const router = express.Router();

// const upload = multer({ storage });

router.post("/upload", upload, fileController.upload);
router.get("/:uuid", fileController.download);

module.exports = router;
