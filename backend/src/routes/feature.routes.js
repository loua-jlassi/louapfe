const express = require("express");
const router = express.Router();
const featureController = require("../controllers/feature.controller");
const { body } = require("express-validator");

router.get("/", featureController.getAll);
router.get("/:id", featureController.getById);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Le nom est obligatoire"),
    body("description")
      .isString()
      .withMessage("La description doit être une chaîne de caractères"),
  ],
  featureController.create
);
router.put("/:id", featureController.update);
router.delete("/:id", featureController.delete);

module.exports = router;
