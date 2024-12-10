const CategoryModel = require("../../models/CategoryModel");

class CategoryController {
  async create(req, res) {
    try {
      const { Title, Status, SortOrder } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!Title || !Image || !Status) {
        return res
          .status(400)
          .send({ message: "عنوان، تصویر و وضعیت الزامی هستند" });
      }

      if (!Number.isInteger(Number(SortOrder))) {
        return res.status(400).json({
          error: "ترتیب مرتب سازی باید عدد باشد",
        });
      }

      const duplicate = await CategoryModel.findOne({ where: { Title } });
      if (duplicate) {
        return res.status(400).send({
          message: "عنوان دسته بندی تکراری است",
        });
      }

      const result = await CategoryModel.create({
        Title,
        Image,
        Status: Status || "active",
        SortOrder: SortOrder || null,
      });
      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send({ message: "ایجاد دسته بندی انجام نشد" });
    }
  }

  async update(req, res) {
    try {
      const { Title, Status, SortOrder } = req.body;
      const { CategoryId } = req.params;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!CategoryId) {
        return res.status(400).send({ message: "شناسه دسته بندی الزامی است" });
      }

      const categoryResult = await CategoryModel.findOne({
        where: { CategoryId },
      });
      if (!categoryResult) {
        return res.status(404).send({ message: "دسته بندی یافت نشد" });
      }

      if (SortOrder !== undefined && !Number.isInteger(Number(SortOrder))) {
        return res.status(400).json({ error: "ترتیب مرتب سازی باید عدد باشد" });
      }

      categoryResult.Title = Title !== undefined ? Title : categoryResult.Title;
      categoryResult.Image = Image !== null ? Image : categoryResult.Image;
      categoryResult.Status =
        Status !== undefined ? Status : categoryResult.Status;
      categoryResult.SortOrder =
        SortOrder !== undefined ? SortOrder : categoryResult.SortOrder;

      await categoryResult.save();
      return res.status(200).send(categoryResult);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "بروز رسانی دسته بندی انجام نشد" });
    }
  }

  async getList(req, res) {
    try {
      const result = await CategoryModel.findAll({
        order: [["SortOrder", "ASC"]],
      });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست دسته بندی یافت نشد" });
    }
  }

  async getById(req, res) {
    try {
      let { CategoryId } = req.params;
      if (!CategoryId) {
        return res.status(400).send({ message: "شناسه دسته بندی الزامی است" });
      }

      let result = await CategoryModel.findOne({
        where: {
          CategoryId: CategoryId,
        },
      });

      if (!result) {
        return res.status(404).send({ message: "دسته بندی یافت نشد" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "خطای سرور" });
    }
  }

  async remove(req, res) {
    try {
      const { CategoryId } = req.params;
      if (!CategoryId) {
        return res.status(400).send({ message: "شناسه دسته بندی الزامی است" });
      }

      const categoryResult = await CategoryModel.findOne({
        where: { CategoryId },
      });
      if (!categoryResult) {
        return res.status(404).send({ message: "دسته بندی یافت نشد" });
      }

      await CategoryModel.destroy({ where: { CategoryId } });
      return res
        .status(200)
        .send({ message: "حذف دسته بندی با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف دسته بندی انجام نشد" });
    }
  }
}

module.exports = new CategoryController();
