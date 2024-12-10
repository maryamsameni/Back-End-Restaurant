const UserModel = require("../models/UserModel");
const RoleModel = require("../models/RoleModel");
const jwt = require("jsonwebtoken");

const CheckPermission = () => {
  return async (req, res, next) => {
    try {
      const Header = req.headers.authorization;
      if (!Header) {
        return res
          .status(400)
          .send({ message: "توکن احراز هویت در هدر ارسال نشده است" });
      }

      let token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(400).send({ message: "توکن معتبر یافت نشد" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      let { Mobile } = decoded;

      let user = await UserModel.findOne({
        where: {
          Mobile,
        },
      });
      let userId = user.dataValues.UserId;

      if (!user) {
        return res.status(404).send({ message: "کاربر پیدا نشد" });
      }

      let role = await RoleModel.findOne({
        where: {
          UserId: userId,
          Type: "CUSTOMER",
        },
      });

      if (role) {
        return res.status(403).json({
          message: "شما به عنوان کاربر دسترسی ندارید",
        });
      } else {
        next();
      }
    } catch (error) {
      next({
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      });
    }
  };
};

module.exports = { CheckPermission };
