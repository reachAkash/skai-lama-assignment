const express = require("express");
const {
  getFile,
  getSingleFile,
  createFile,
  updateFile,
  deleteFile,
} = require("../controllers/projectFile.controllers");
const router = express.Router();

router.post("/", getFile);
router.post("/:fileId", getSingleFile);
router.patch("/:fileId", updateFile);
router.post("/delete/:fileId", deleteFile);
router.post("/create/create-file", createFile);

module.exports = router;
