const express = require("express");
const router = express.Router();
const crudController = require("../controller/crud_controller");
const { auth } = require("../middleware/auth");
const cache = require("../middleware/cache");

/* Creating a schema for crud operation C: Create */
router.post("/CRUDcreate", auth, crudController.create);

/* Router for CRUD operation R: read */
router.get("/CRUDread", auth, cache(100), crudController.read);

/* CRUD operation 'update' router */
router.post("/CRUDupdate", auth, crudController.update);

/* Router to perform delete of CRUD operations */
router.post("/CRUDdelete", auth, crudController.delete);

module.exports = router;
