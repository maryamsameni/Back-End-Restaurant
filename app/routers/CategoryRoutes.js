const router = require("express").Router();
const {
  create,
  update,
  getList,
  getById,
  remove,
} = require("../http/controller/CategoryController");
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
  "/update/:CategoryId",
  sequelizeIdValidator("CategoryId"),
  CheckLogin,
  CheckPermission(),
  UploadMulter.single("Image"),
  update
);
router.get("/getById/:CategoryId", sequelizeIdValidator("CategoryId"), getById);
router.get("/getList", getList);
router.delete(
  "/remove/:CategoryId",
  sequelizeIdValidator("CategoryId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  CategoryRoutes: router,
};
