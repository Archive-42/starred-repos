const router = require("express").Router();
const authController = require("./auth-controller");
const {
  bodyValidation,
  loginValidation,
  validateUsername,
  usernameAvailability,
} = require("./auth-middleware");

router.post(
  "/register",
  bodyValidation,
  usernameAvailability,
  authController.register
);

router.post("/login", loginValidation, validateUsername, authController.login);

module.exports = router;
