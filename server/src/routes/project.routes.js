const express = require("express");
const {
  getProject,
  createProject,
  getSingleProject,
} = require("../controllers/project.controllers");
const router = express.Router();

router.post("/", getProject);
router.get("/:projectId", getSingleProject);
router.post("/create-project", createProject);

module.exports = router;
