const router = require("express").Router();
const {
  create,
  update,
  getList,
  getById,
  remove,
} = require("../http/controller/ProductAttributeController");
const { sequelizeIdValidator } = require("../http/validations/public");
const { CheckLogin } = require("../middlewares/checkLogin");
const { CheckPermission } = require("../middlewares/checkPermission");

router.post("/create", CheckLogin, CheckPermission(), create);
router.put(
  "/update/:ProductAttributeId",
  sequelizeIdValidator("ProductAttributeId"),
  CheckLogin,
  CheckPermission(),
  update
);
router.get("/getList", getList);
router.get(
  "/getById/:ProductAttributeId",
  sequelizeIdValidator("ProductAttributeId"),
  getById
);
router.delete(
  "/remove/:ProductAttributeId",
  sequelizeIdValidator("ProductAttributeId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  ProductAttributeRoutes: router,
};
