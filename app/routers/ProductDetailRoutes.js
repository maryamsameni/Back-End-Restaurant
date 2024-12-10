const router = require("express").Router();
const {
  create,
  update,
  getList,
  getById,
  remove,
} = require("../http/controller/ProductDetailController");
let { UploadMulter } = require("../modules/multer");
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
  "/update/:ProductDetailId",
  sequelizeIdValidator("ProductDetailId"),
  CheckLogin,
  CheckPermission(),
  UploadMulter.single("Image"),
  update
);
router.get("/getList", getList);
router.get(
  "/getById/:ProductDetailId",
  sequelizeIdValidator("ProductDetailId"),
  getById
);
router.delete(
  "/remove/:ProductDetailId",
  sequelizeIdValidator("ProductDetailId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  ProductDetailRoutes: router,
};
