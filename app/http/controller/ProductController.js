const ProductModel = require("../../models/ProductModel");
const CategoryModel = require("../../models/CategoryModel");

class ProductController {
  async create(req, res) {
    try {
      const {
        CategoryId,
        Title,
        Description,
        Status,
        Price,
        Discount,
        FinalPrice,
      } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!Title || !CategoryId || !Price) {
        return res.status(400).send({
          message: "شناسه دسته بندی، عنوان و قیمت الزامی هستند",
        });
      }

      const CategoryResult = await CategoryModel.findByPk(CategoryId);
      if (!CategoryResult) {
        return res.status(400).send({ message: "دسته بندی یافت نشد" });
      }

      const duplicate = await ProductModel.findOne({
        where: { Title },
      });

      if (duplicate) {
        return res.status(400).send({
          message: "عنوان محصول تکراری است",
        });
      }

      const result = await ProductModel.create({
        CategoryId,
        Title,
        Description,
        Status: Status || "active",
        Price,
        Discount: Discount || 0,
        FinalPrice: FinalPrice || Price,
        Image,
      });
      return res.status(201).send(result);
    } catch (error) {
      return res.status(500).send({ message: "ایجاد محصول انجام نشد" });
    }
  }

  async update(req, res) {
    try {
      const { ProductId } = req.params;
      const {
        CategoryId,
        Title,
        Description,
        Status,
        Price,
        Discount,
        FinalPrice,
      } = req.body;
      let Image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      if (!ProductId) {
        return res.status(400).send({ message: "شناسه محصول الزامی است" });
      }

      if (!Title || !CategoryId || !Price) {
        return res.status(400).send({
          message: "عنوان، شناسه دسته بندی و قیمت الزامی هستند",
        });
      }

      const productResult = await ProductModel.findOne({
        where: { ProductId },
      });

      if (!productResult) {
        return res.status(404).send({ message: "محصول یافت نشد" });
      }

      const [updatedCount] = await ProductModel.update(
        {
          CategoryId,
          Title,
          Description,
          Status: Status || productResult.Status,
          Price,
          Discount: Discount || 0,
          FinalPrice: FinalPrice || Price,
          Image,
        },
        {
          where: { ProductId },
        }
      );

      if (updatedCount === 0) {
        return res.status(400).send({ message: "هیچ تغییری اعمال نشد" });
      }

      const updatedProduct = await ProductModel.findOne({
        where: { ProductId },
      });

      return res.status(200).send({
        message: "بروزرسانی با موفقیت انجام شد",
        updatedProduct,
      });
    } catch (error) {
      return res.status(500).send({ message: "بروزرسانی محصول انجام نشد" });
    }
  }

  async getList(req, res) {
    try {
      const result = await ProductModel.findAll();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "لیست محصولات یافت نشد" });
    }
  }

  async getById(req, res) {
    try {
      let { ProductId } = req.params;
      if (!ProductId) {
        return res.status(400).send({ message: "شناسه محصول الزامی است" });
      }
      let result = await ProductModel.findOne({
        where: {
          ProductId: ProductId,
        },
      });

      if (!result) {
        return res.status(404).send({ message: "محصول یافت نشد" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({ message: "خطای سرور" });
    }
  }

  async remove(req, res) {
    try {
      const { ProductId } = req.params;

      if (!ProductId) {
        return res.status(400).send({ message: "شناسه محصول الزامی است" });
      }

      const deletedCount = await ProductModel.destroy({
        where: {
          ProductId,
        },
      });

      if (deletedCount === 0) {
        return res.status(404).send({ message: "محصول یافت نشد" });
      }

      return res.status(200).send({ message: "حذف محصول با موفقیت انجام شد" });
    } catch (error) {
      return res.status(500).send({ message: "حذف محصول انجام نشد" });
    }
  }
}

module.exports = new ProductController();
