const router = require("express").Router();
const {
  create,
  update,
  getList,
  getById,
  remove,
} = require("../http/controller/ProductSuggestionController");
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
  "/update/:ProductSuggestionId",
  CheckLogin,
  CheckPermission(),
  UploadMulter.single("Image"),
  sequelizeIdValidator("ProductSuggestionId"),
  update
);
router.get("/getList", getList);
router.get(
  "/getById/:ProductSuggestionId",
  sequelizeIdValidator("ProductSuggestionId"),
  getById
);
router.delete(
  "/remove/:ProductSuggestionId",
  sequelizeIdValidator("ProductSuggestionId"),
  CheckLogin,
  CheckPermission(),
  remove
);

module.exports = {
  ProductSuggestionRoutes: router,
};
