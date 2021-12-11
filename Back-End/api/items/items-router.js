const itemsController = require("./items-controller");
const { bodyValidation } = require("./items-middleware");

const router = require("express").Router();

router.get("/", itemsController.findAll);

router.get("/:item_id", itemsController.findByID);

router.post("/", bodyValidation, itemsController.addItem);

module.exports = router;
