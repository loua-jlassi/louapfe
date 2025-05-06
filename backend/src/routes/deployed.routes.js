const express = require("express");
const router = express.Router();
const deployedController = require("../controllers/deployed.controller");

router.get("/deployed", deployedController.getDeployed);

module.exports = router;
