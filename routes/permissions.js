const express = require("express");
const router = express.Router();

const {
  index,
  store,
  update,
  destroy,
  get_by_id,
} = require("../controllers/permissions.controller");

const {
  add_permission,
  update_permission,
} = require("../middlewares/validations/permission.validation");

const { isLogin, access } = require("../middlewares/auth.middlewares");

router.get("/", isLogin, access(["admin", "super admin"]), index);

router.post(
  "/",
  isLogin,
  access(["admin", "super admin"]),
  add_permission,
  store
);

router.put(
  "/:id",
  isLogin,
  access(["admin", "super admin"]),
  update_permission,
  update
);

router.delete("/:id", isLogin, access(["admin", "super admin"]), destroy);

router.get("/:id", isLogin, access(["admin", "super admin"]), get_by_id);

module.exports = router;
