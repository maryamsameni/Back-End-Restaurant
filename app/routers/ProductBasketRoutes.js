const router = require("express").Router();
const {
  create,
  update,
  getList,
  getById,
  remove,
} = require("../http/controller/ProductBasketController");
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
  "/update/:ProductBasketId",
  sequelizeIdValidator("ProductBasketId"),
  CheckLogin,
  CheckPermission(),
  UploadMulter.single("Image"),
  update
);
router.get("/getList", getList);
router.get(
  "/getById/:ProductBasketId",
  sequelizeIdValidator("ProductBasketId"),
  getById
);
router.delete(
  "/remove/:ProductBasketId",
  sequelizeIdValidator("ProductBasketId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  ProductBasketRoutes: router,
};
