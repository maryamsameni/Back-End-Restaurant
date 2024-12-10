const router = require("express").Router();
const {
  create,
  update,
  getList,
  getById,
  remove,
} = require("../http/controller/ProductController");
const { UploadMulter } = require("./../modules/multer");
const { sequelizeIdValidator } = require("../http/validations/public");
const { CheckLogin } = require("../middlewares/checkLogin");
const { CheckPermission } = require("../middlewares/checkPermission");

router.post(
  "/create",
  CheckLogin,
  CheckPermission(),
  UploadMulter.single("Image"),
  create
);
router.put(
  "/update/:ProductId",
  CheckLogin,
  CheckPermission(),
  sequelizeIdValidator("ProductId"),
  UploadMulter.single("Image"),
  update
);
router.get("/getList", getList);
router.get("/getById/:ProductId", sequelizeIdValidator("ProductId"), getById);
router.delete(
  "/remove/:ProductId",
  sequelizeIdValidator("ProductId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  ProductRoutes: router,
};
