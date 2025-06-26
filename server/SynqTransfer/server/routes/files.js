const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadMiddleware = require("../middlewares/upload");
const fileController = require("../controllers/fileController");

const router = express.Router();

// const upload = multer({ storage });

router.post("/upload", uploadMiddleware, fileController.upload);
// router.get("/:uuid/download", fileController.download);

module.exports = router;
