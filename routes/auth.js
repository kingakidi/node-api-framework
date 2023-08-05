const try_catch = require("../middlewares/trycatch");
const express = require("express");
const router = express.Router();
const { login, auth_email } = require("../controllers/auth.controller");

const {
  email_auth_validation,
  login_validation,
} = require("../middlewares/validations/auth.validation");

router.post("/login", login_validation, login);
router.get("/email", email_auth_validation, auth_email);

module.exports = router;
