const ProductSuggestionModel = require("../../models/ProductSuggestionModel");

class ProductSuggestionController {
  async create(req, res) {
    try {
      const { Title, Value, IsActive } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!Title || !Value) {
        return res.status(400).send({ message: "عنوان و مقدار الزامی هستند" });
      }

      const result = await ProductSuggestionModel.create({
        Title,
        Value,
        IsActive,
        Image,
      });
      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send({ message: "ایجاد پیشنهاد محصول انجام نشد" });
    }
  }

  async update(req, res) {
    try {
      const { ProductSuggestionId } = req.params;
      const { Title, Value, IsActive } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!ProductSuggestionId) {
        return res
          .status(400)
          .send({ message: "شناسه پیشنهاد محصول الزامی است" });
      }

      const [updatedCount] = await ProductSuggestionModel.update(
        {
          Title,
          Value,
          IsActive,
          Image,
        },
        {
          where: {
            ProductSuggestionId,
          },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).send({ message: "پیشنهاد محصول یافت نشد" });
      }

      return res.status(200).send({ message: "بروزرسانی با موفقیت انجام شد" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "بروزرسانی پیشنهاد محصول انجام نشد" });
    }
  }

  async getList(req, res) {
    try {
      const result = await ProductSuggestionModel.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "لیست پیشنهادات محصولات یافت نشد" });
    }
  }

  async getById(req, res) {
    try {
      let { ProductSuggestionId } = req.params;
      if (!ProductSuggestionId) {
        return res
          .status(400)
          .send({ message: "شناسه پیشنهاد محصول الزامی است" });
      }

      let result = await ProductSuggestionModel.findOne({
        where: {
          ProductSuggestionId: ProductSuggestionId,
        },
      });

      if (!result) {
        return res.status(404).send({ message: "پیشنهاد محصول یافت نشد" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "خطای سرور" });
    }
  }

  async remove(req, res) {
    try {
      const { ProductSuggestionId } = req.params;

      if (!ProductSuggestionId) {
        return res
          .status(400)
          .send({ message: "شناسه پیشنهاد محصول الزامی است" });
      }

      const deletedCount = await ProductSuggestionModel.destroy({
        where: {
          ProductSuggestionId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "پیشنهاد محصول یافت نشد" });
      }

      return res
        .status(200)
        .send({ message: "حذف پیشنهاد محصول با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف پیشنهاد محصول انجام نشد" });
    }
  }
}

module.exports = new ProductSuggestionController();
