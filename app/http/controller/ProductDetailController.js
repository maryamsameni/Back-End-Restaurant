const ProductDetailModel = require("../../models/ProductDetailModel");
const ProductModel = require("../../models/ProductModel");

class ProductDetailController {
  async create(req, res) {
    try {
      const { ProductId, Title, Description, Price, StockQuantity } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!ProductId || !Title || !Price || !StockQuantity) {
        return res.status(400).send({
          message: "شناسه محصول، عنوان، قیمت و تعداد موجودی الزامی هستند",
        });
      }

      let ProductResult = await ProductModel.findByPk(ProductId);
      if (!ProductResult) {
        return res.status(400).send({ message: "محصول یافت نشد" });
      }

      let duplicate = await ProductDetailModel.findOne({
        where: { Title, ProductId },
      });

      if (duplicate) {
        return res
          .status(400)
          .send({ message: "عنوان جزئیات محصول تکراری است" });
      }

      const result = await ProductDetailModel.create({
        ProductId,
        Title,
        Description,
        Price,
        StockQuantity,
        Image,
      });
      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send({ message: "ایجاد جزئیات محصول انجام نشد" });
    }
  }

  async update(req, res) {
    try {
      const { ProductDetailId } = req.params;
      const { ProductId, Title, Description, Price, StockQuantity } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!ProductDetailId) {
        return res
          .status(400)
          .send({ message: "شناسه جزئیات محصول الزامی است" });
      }

      if (!Title || !Price || !StockQuantity) {
        return res.status(400).send({
          message: "عنوان، قیمت و تعداد موجودی الزامی هستند",
        });
      }

      let ProductResult = await ProductModel.findByPk(ProductId);
      if (!ProductResult) {
        return res.status(404).send({ message: "محصول یافت نشد" });
      }

      const [updatedCount] = await ProductDetailModel.update(
        {
          ProductId,
          Title,
          Description,
          Price,
          StockQuantity,
          Image,
        },
        {
          where: {
            ProductDetailId,
          },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).send({ message: "جزئیات محصول یافت نشد" });
      }

      const updatedProductDetail = await ProductDetailModel.findByPk(
        ProductDetailId
      );

      return res.status(200).send({
        message: "بروزرسانی با موفقیت انجام شد",
        updatedProductDetail,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "بروزرسانی جزئیات محصول انجام نشد" });
    }
  }

  async getList(req, res) {
    try {
      const result = await ProductDetailModel.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست جزئیات محصولات یافت نشد" });
    }
  }

  async getById(req, res) {
    try {
      let { ProductDetailId } = req.params;
      if (!ProductDetailId) {
        return res
          .status(400)
          .send({ message: "شناسه جزئیات محصول الزامی است" });
      }

      let result = await ProductDetailModel.findOne({
        where: {
          ProductDetailId: ProductDetailId,
        },
      });

      if (!result) {
        return res.status(404).send({ message: "جزئیات محصول یافت نشد" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "خطای سرور" });
    }
  }

  async remove(req, res) {
    try {
      const { ProductDetailId } = req.params;

      if (!ProductDetailId) {
        return res
          .status(400)
          .send({ message: "شناسه جزئیات محصول الزامی است" });
      }

      const deletedCount = await ProductDetailModel.destroy({
        where: {
          ProductDetailId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "جزئیات محصول یافت نشد" });
      }

      return res
        .status(200)
        .send({ message: "حذف جزئیات محصول با موفقیت انجام شد" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "حذف جزئیات محصول انجام نشد", error });
    }
  }
}

module.exports = new ProductDetailController();
