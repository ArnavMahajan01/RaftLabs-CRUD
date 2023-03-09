const express = require("express");
const router = express.Router();

router.use("/", require("./crud.js"));
router.use("/", require("./users.js"));

module.exports = router;
