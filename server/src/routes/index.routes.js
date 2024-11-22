const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const fileRoutes = require("./projectFile.routes");

// routes mapping
router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/file", fileRoutes);

module.exports = router;
