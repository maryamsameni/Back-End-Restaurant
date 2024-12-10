const router = require("express").Router();
const {
  login,
  reqister,
  update,
  get,
  remove,
} = require("./../http/controller/UserController");
const { sequelizeIdValidator } = require("../http/validations/public");
const { CheckLogin } = require("../middlewares/checkLogin");
const { CheckPermission } = require("../middlewares/checkPermission");

router.post("/reqister", reqister);
router.post("/login", login);
router.put("/update/:UserId", sequelizeIdValidator("UserId"), update);
router.get("/get", CheckLogin, CheckPermission(), get);
router.delete(
  "/remove/:UserId",
  sequelizeIdValidator("UserId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  UserRoutes: router,
};
