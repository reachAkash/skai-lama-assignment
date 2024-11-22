const express = require("express");
const { getUser, createUser } = require("../controllers/user.controllers");
const router = express.Router();

router.get("/", getUser);
router.post("/create-user", createUser);

module.exports = router;
