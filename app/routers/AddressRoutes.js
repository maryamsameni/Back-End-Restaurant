const router = require("express").Router();
const {
  create,
  update,
  getById,
  getList,
  remove,
} = require("../http/controller/AddressController");
const { sequelizeIdValidator } = require("../http/validations/public");
const { CheckLogin } = require("../middlewares/checkLogin");
const { CheckPermission } = require("../middlewares/checkPermission");

router.post("/create", CheckLogin, CheckPermission(), create);
router.put(
  "/update/:AddressId",
  sequelizeIdValidator("AddressId"),
  CheckLogin,
  CheckPermission(),
  update
);
router.get("/getList", getList);
router.get("/getById/:AddressId", sequelizeIdValidator("AddressId"), getById);
router.delete(
  "/remove/:AddressId",
  sequelizeIdValidator("AddressId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  AddressRoutes: router,
};
