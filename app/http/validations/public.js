const { param, validationResult } = require("express-validator");

function sequelizeIdValidator(paramName = "id") {
  return [
    param(paramName)
      .isInt({ min: 1 })
      .withMessage("شناسه ارسال شده صحیح نمی باشد"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "خطا در اعتبار سنجی",
          errors: errors.array(),
        });
      }
      next();
    },
  ];
}

module.exports = { sequelizeIdValidator };
