const express = require("express");
const router = express.Router();

const {
  add_user,
  update_user,
} = require("../middlewares/validations/user.validation");
const {
  index,
  store,
  update,
  destroy,
} = require("../controllers/users.controller");

const { isLogin, access } = require("../middlewares/auth.middlewares");

router.get("/", isLogin, access(["admin", "super admin"]), index);

router.post("/", add_user, store);

router.put("/:id", isLogin, update_user, update);

router.delete("/:id", isLogin, access(["admin", "super admin"]), destroy);

module.exports = router;
