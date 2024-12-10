const UserModel = require("./../../models/UserModel");
const RoleModel = require("./../../models/RoleModel");
const { hashString, tokenGenerator } = require("./../../modules/function");
let sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class UserController {
  async reqister(req, res, next) {
    try {
      const { FirstName, LastName, Mobile, Password, Email } = req.body;

      if (!FirstName || !LastName || !Mobile || !Password || !Email) {
        return res.status(400).json({ message: "تمام فیلدها باید پر شوند." });
      }

      let existingUser = await UserModel.findOne({
        where: {
          [sequelize.Op.or]: [{ Email }, { Mobile }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "ایمیل یا موبایل قبلاً ثبت شده است." });
      }

      const hashPassword = hashString(Password);

      const result = await UserModel.create({
        message: "کاربر با موفقیت ثبت شد.",
        FirstName,
        LastName,
        Mobile,
        Password: hashPassword,
        Email,
      });

      await RoleModel.create({ UserId: result.UserId, Type: "CUSTOMER" });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      let { Mobile, Password } = req.body;
      if (!Mobile || !Password) {
        return res
          .status(400)
          .json({ message: "موبایل و رمز عبور الزامی هستند" });
      }

      let user = await UserModel.findOne({ where: { Mobile } });
      if (!user){
        return res.status(401).json({ message: "نام کاربری یا رمز عبور پیدا نشد" });
      }

      let compareResult = bcrypt.compareSync(Password, user.Password);
    
      if (!compareResult) {
        return res.status(401).json({ message: "اطلاعات ورود صحیح نیست" });
      }
      const token = tokenGenerator({ Mobile });
      
      user.token = token;
      await user.save();

      const role = await RoleModel.findOne({ where: { UserId: user.UserId } });
      return res.status(200).json({
        status: 200,
        success: true,
        message: "شما با موفقیت وارد حساب کاربری خود شدید",
        token,
        role: role.Type,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      let { UserId } = req.params;
      let { FirstName, LastName, Mobile, Password, Email } = req.body;

      let user = await UserModel.findByPk(UserId);
      if (!user)
        return res.status(400).json({ status: 400, message: "کاربر پیدا نشد" });

      if (FirstName || LastName || Mobile || Email) {
        user.FirstName = FirstName;
        user.LastName = LastName;
        user.Mobile = Mobile;
        user.Email = Email;
      }

      if (Password) {
        let newPassword = await bcrypt.hash(Password, 10);
        user.Password = newPassword;
      }

      await user.save();
      return res.status(200).json({
        status: 200,
        message: "اطلاعات کاربر با موفقیت به روزرسانی شد",
      });
    } catch (error) {
      return res.status(500).send({ message: "بروزرسانی کاربر انجام نشد" });
    }
  }

  async get(req, res) {
    try {
      let result = await UserModel.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست کاربران یافت نشد" });
    }
  }

  async remove(req, res) {
    try {
      let { UserId } = req.params;
      if (!UserId)
        return res.status(400).send({ message: "شناسه کاربر الزامی است" });

      const deletedCount = await UserModel.destroy({
        where: {
          UserId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "کاربر یافت نشد" });
      }

      return res.status(204).send({ message: "حذف کاربر با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف کاربر انجام نشد" });
    }
  }
}

module.exports = new UserController();
