const express = require("express");
const router = express.Router();
const {
  index,
  store,
  update,
  destroy,
  role_by_id,
  role_by_title,
  add_user_role,
} = require("../controllers/roles.controller");
const { isLogin, access } = require("../middlewares/auth.middlewares");

const {
  add_role,
  update_role,
  change_user_role,
} = require("../middlewares/validations/role.validation");

router.get("/", isLogin, access(["admin", "super admin"]), index);

router.post("/", isLogin, add_role, store);

router.put(
  "/:id",
  isLogin,
  access(["admin", "super admin"]),
  update_role,
  update
);

router.delete("/:id", isLogin, access(["admin", "super admin"]), destroy);

router.get(
  "/title/:title",
  isLogin,
  access(["admin", "super admin"]),
  role_by_title
);

router.get("/:id", role_by_id);

router.post(
  "/change_user_role",
  isLogin,
  access(["admin", "super admin"]),
  change_user_role,
  add_user_role
);
module.exports = router;
