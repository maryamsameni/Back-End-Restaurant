const ProductAttributeModel = require("../../models/ProductAttributeModel");
const ProductDetailModel = require("../../models/ProductDetailModel");

class ProductAttributeController {
  async create(req, res) {
    try {
      const { ProductAttributes } = req.body;

      if (
        !ProductAttributes ||
        !Array.isArray(ProductAttributes) ||
        ProductAttributes.length === 0
      ) {
        return res.status(400).send({ message: "ورودی معتبر نیست" });
      }

      const createdAttributes = [];
      for (let item of ProductAttributes) {
        const { ProductDetailId, Name, Options, Price } = item;

        if (!ProductDetailId) {
          return res
            .status(400)
            .send({ message: "شناسه جزئیات محصول الزامی است" });
        }

        let ProductDetail = await ProductDetailModel.findByPk(ProductDetailId);
        if (!ProductDetail) {
          return res.status(404).send({ message: "جزئیات محصول یافت نشد" });
        }

        if (!Name || !Options || !Price) {
          return res.status(400).send({ message: "تمامی فیلدها الزامی هستند" });
        }

        const result = await ProductAttributeModel.create({
          ProductDetailId,
          Name,
          Options,
          Price,
        });

        createdAttributes.push(result);
      }

      return res.status(201).send({
        message: "ویژگی‌های محصول با موفقیت ایجاد شدند",
        data: createdAttributes,
      });
    } catch (error) {
      return res.status(500).send({
        message: "ایجاد ویژگی محصول انجام نشد",
        error: error.message || error,
      });
    }
  }

  async update(req, res) {
    try {
      const { ProductAttributeId } = req.params;
      const { ProductDetailId, Name, Options, Price } = req.body;

      if (!ProductAttributeId) {
        return res
          .status(400)
          .send({ message: "شناسه ویژگی محصول الزامی است" });
      }

      let ProductDetail;
      if (ProductDetailId) {
        ProductDetail = await ProductDetailModel.findByPk(ProductDetailId);
        if (!ProductDetail) {
          return res.status(400).send({ message: "شناسه جزئیات یافت نشد" });
        }
      }

      const [updatedCount] = await ProductAttributeModel.update(
        {
          ProductDetailId,
          Name,
          Options,
          Price,
        },
        {
          where: {
            ProductAttributeId,
          },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).send({ message: "ویژگی محصول یافت نشد" });
      }

      const updatedProductAttribute = await ProductAttributeModel.findByPk(
        ProductAttributeId
      );

      return res.status(200).send({
        message: "بروزرسانی با موفقیت انجام شد",
        updatedProductAttribute,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "بروزرسانی ویژگی محصول انجام نشد" });
    }
  }

  async getList(req, res) {
    try {
      const result = await ProductAttributeModel.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست ویژگی محصول یافت نشد" });
    }
  }

  async getById(req, res) {
    try {
      const { ProductAttributeId } = req.params;
      if (!ProductAttributeId) {
        return res
          .status(400)
          .send({ message: "شناسه ویژگی محصول الزامی است" });
      }

      let result = await ProductAttributeModel.findOne({
        where: {
          ProductAttributeId: ProductAttributeId,
        },
      });

      if (!result) {
        return res.status(404).send({ message: "ویژگی محصول یافت نشد" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "خطای سرور" });
    }
  }

  async remove(req, res) {
    try {
      const { ProductAttributeId } = req.params;

      if (!ProductAttributeId) {
        return res
          .status(400)
          .send({ message: "شناسه ویژگی محصول الزامی است" });
      }

      const deletedCount = await ProductAttributeModel.destroy({
        where: {
          ProductAttributeId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "ویژگی محصول یافت نشد" });
      }

      return res
        .status(200)
        .send({ message: "حذف ویژگی محصول با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف ویژگی محصول انجام نشد" });
    }
  }
}

module.exports = new ProductAttributeController();
