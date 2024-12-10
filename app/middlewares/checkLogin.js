const UserModel = require("../models/UserModel");
const { tokenJwtVerfiy } = require("../modules/function");

const CheckLogin = async (req, res, next) => {
  try {
    let verifyError = {
      status: 401,
      message: "برای دسترسی به این بخش، لطفاً وارد حساب کاربری خود شوید.",
    };

    let authorization = req?.headers?.authorization;
    if (!authorization) {
      return res.status(verifyError.status).json({
        message: "توکن ورود یافت نشد. لطفاً وارد حساب کاربری خود شوید.",
      });
    }

    let token = authorization.split(" ")?.[1];
    if (!token) {
      return res
        .status(verifyError.status)
        .json({ message: "توکن ورود معتبر نیست. لطفاً دوباره وارد شوید." });
    }

    let result = tokenJwtVerfiy(token);

    if (result?.status === 401) {
      return res.status(result.status).json({ message: result.message });
    }

    let { Mobile } = result;
    let user = await UserModel.findOne({ where: { Mobile } });
    if (!user) {
      return res.status(verifyError.status).json({
        message:
          "کاربری با این شماره موبایل پیدا نشد. لطفاً وارد حساب کاربری خود شوید.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next({
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { CheckLogin };
