const AddressModel = require("../../models/AddressModel");
const UserModel = require("../../models/UserModel");

class Address {
  async create(req, res) {
    try {
      const { UserId, Province, City, Street, ZipCode } = req.body;

      if (!UserId || !Province || !City || !Street || !ZipCode) {
        return res
          .status(400)
          .send({ message: "تمامی فیلدهای ضروری باید پر شوند" });
      }

      const UserResult = await UserModel.findByPk(UserId);

      if (!UserResult) {
        return res.status(404).send({ message: "کاربر یافت نشد" });
      }
      const result = await AddressModel.create({
        UserId,
        Province,
        City,
        Street,
        ZipCode,
      });
      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send({ message: "ایجاد آدرس انجام نشد" });
    }
  }

  async update(req, res) {
    try {
      const { AddressId } = req.params;
      const { UserId, Province, City, Street, ZipCode } = req.body;

      if (!AddressId)
        return res.status(400).send({ message: "شناسه آدرس الزامی است" });

      if (UserId) {
        const UserResult = await UserModel.findByPk(UserId);

        if (!UserResult) {
          return res.status(404).send({ message: "کاربر یافت نشد" });
        }
      }

      const AddressResult = await AddressModel.findByPk(AddressId);

      if (!AddressResult) {
        return res.status(404).send({ message: "آدرس یافت نشد" });
      }

      const [updatedCount] = await AddressModel.update(
        {
          UserId,
          Province,
          City,
          Street,
          ZipCode,
        },
        {
          where: {
            AddressId,
          },
        }
      );

      if (updatedCount === 0)
        return res.status(404).send({ message: "آدرس یافت نشد" });

      const updatedAddress = await AddressModel.findOne({
        where: { AddressId },
      });

      return res
        .status(200)
        .send({ message: "بروزرسانی با موفقیت انجام شد", updatedAddress });
    } catch (error) {
      return res.status(500).send({ message: "بروزرسانی آدرس انجام نشد" });
    }
  }

  async getById(req, res) {
    try {
      let { AddressId } = req.params;
      if (!AddressId)
        return res.status(400).send({ message: "شناسه آدرس الزامی است" });

      let result = await UserModel.findOne({
        include: {
          model: AddressModel,
          as: "Addresses",
          where: {
            AddressId,
          },
        },
      });

      if (!result)
        return res.status(400).send({ message: "آدرس مورد نظر یافت نشد" });
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "آدرس یافت نشد" });
    }
  }

  async getList(req, res) {
    try {
      let result = await AddressModel.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست آدرس ها یافت نشد" });
    }
  }

  async remove(req, res) {
    try {
      const { AddressId } = req.params;
      if (!AddressId) {
        return res.status(400).send({ message: "شناسه آدرس الزامی است" });
      }

      const deletedCount = await AddressModel.destroy({
        where: {
          AddressId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "آدرس یافت نشد" });
      }

      return res.status(200).send({ message: "حذف آدرس با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف آدرس انجام نشد" });
    }
  }
}

module.exports = new Address();
