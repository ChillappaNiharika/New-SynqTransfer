const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = require("../middlewares/upload");
const fileController = require("../controllers/fileController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});
// const upload = multer({ storage });

router.post("/upload", upload.array("files", 500), fileController.upload);
router.get("/:uuid", fileController.download);

module.exports = router;
