const ProductBasketModel = require("../../models/ProductBasketModel");
const ProductModel = require("../../models/ProductModel");
const ProductSuggestionModel = require("../../models/ProductSuggestionModel");
const ProductAttributeModel = require("../../models/ProductAttributeModel");
const ProductBasket = require("../../models/ProductBasketModel");

class ProductBasketController {
  async create(req, res) {
    try {
      const {
        ProductId,
        Title,
        ProductAttributeId,
        Price,
        OrderNumber,
        ProductSuggestionId,
        Quantity,
      } = req.body;

      const TotalPrice = Price * Quantity;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      let ProductResult = await ProductModel.findByPk(ProductId);
      if (!ProductResult) {
        return res.status(400).send({ message: "محصول یافت نشد" });
      }

      if (ProductSuggestionId) {
        let ProductSuggestionResult = await ProductSuggestionModel.findByPk(
          ProductSuggestionId
        );
        if (!ProductSuggestionResult) {
          return res.status(400).send({ message: "پیشنهاد محصول یافت نشد" });
        }
      }

      if (ProductAttributeId) {
        let ProductAttributeResult = await ProductAttributeModel.findByPk(
          ProductAttributeId
        );
        if (!ProductAttributeResult) {
          return res.status(400).send({ message: "ویژگی محصول یافت نشد" });
        }
      }

      if (!ProductId || !Title || !Price || !Quantity) {
        return res
          .status(400)
          .send({ message: "شناسه محصول، عنوان، قیمت و تعداد الزامی هستند" });
      }

      let duplicate = await ProductBasketModel.findOne({
        where: {
          Title,
        },
      });

      if (duplicate) {
        return res.status(400).send({ message: "عنوان سبد محصول تکراری است" });
      }

      const result = await ProductBasketModel.create({
        ProductId,
        Title,
        ProductAttributeId,
        Price,
        OrderNumber,
        ProductSuggestionId,
        Quantity,
        Image,
      });

      return res.status(201).send({ result, TotalPrice });
    } catch (error) {
      return res.status(500).send({ message: "ایجاد سبد محصول انجام نشد" });
    }
  }

  async update(req, res) {
    try {
      const { ProductBasketId } = req.params;
      const {
        ProductId,
        Title,
        ProductAttributeId,
        Price,
        OrderNumber,
        ProductSuggestionId,
        Quantity,
      } = req.body;

      if (!ProductBasketId) {
        return res.status(400).send({ message: "شناسه سبد محصول الزامی است" });
      }

      if (!ProductId || !Title || !Price || !Quantity) {
        return res
          .status(400)
          .send({ message: "شناسه محصول، عنوان، قیمت و تعداد الزامی هستند" });
      }

      const TotalPrice = Price * Quantity;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      let ProductResult = await ProductModel.findByPk(ProductId);
      if (!ProductResult) {
        return res.status(400).send({ message: "محصول یافت نشد" });
      }

      if (ProductSuggestionId) {
        let ProductSuggestionResult = await ProductSuggestionModel.findByPk(
          ProductSuggestionId
        );
        if (!ProductSuggestionResult) {
          return res.status(400).send({ message: "پیشنهاد محصول یافت نشد" });
        }
      }

      if (ProductAttributeId) {
        let ProductAttributeResult = await ProductAttributeModel.findByPk(
          ProductAttributeId
        );
        if (!ProductAttributeResult) {
          return res.status(400).send({ message: "ویژگی محصول یافت نشد" });
        }
      }

      const [updatedCount] = await ProductBasketModel.update(
        {
          ProductId,
          Title,
          ProductAttributeId,
          Price,
          OrderNumber,
          ProductSuggestionId,
          Quantity,
          Image,
        },
        {
          where: {
            ProductBasketId,
          },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).send({ message: "سبد محصول یافت نشد" });
      }

      const updatedProductBasket = await ProductBasketModel.findByPk(
        ProductBasketId
      );

      return res.status(200).send({
        message: "بروزرسانی با موفقیت انجام شد",
        updatedProductBasket,
        TotalPrice,
      });
    } catch (error) {
      return res.status(500).send({ message: "بروزرسانی سبد محصول انجام نشد" });
    }
  }

  async getList(req, res) {
    try {
      const result = await ProductBasketModel.findAll({
        order: [["OrderNumber", "ASC"]],
      });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست سبد محصولات یافت نشد" });
    }
  }

  async getById(req, res) {
    try {
      const { ProductBasketId } = req.params;

      if (!ProductBasketId) {
        return res.status(400).send({ message: "شناسه سبد محصول الزامی است" });
      }

      let result = await ProductBasket.findOne({
        where: {
          ProductBasketId: ProductBasketId,
        },
      });

      if (!result) {
        return res.status(404).send({ message: "سبد محصول یافت نشد" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "خطای سرور" });
    }
  }

  async remove(req, res) {
    try {
      const { ProductBasketId } = req.params;

      if (!ProductBasketId) {
        return res.status(400).send({ message: "شناسه سبد محصول الزامی است" });
      }

      const deletedCount = await ProductBasketModel.destroy({
        where: {
          ProductBasketId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "سبد محصول یافت نشد" });
      }

      return res
        .status(200)
        .send({ message: "حذف سبد محصول با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف سبد محصول انجام نشد" });
    }
  }
}

module.exports = new ProductBasketController();
