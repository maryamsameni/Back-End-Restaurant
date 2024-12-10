const Category = require("./CategoryModel");
const Product = require("./ProductModel");
const ProductDetail = require("./ProductDetailModel");
const ProductAttribute = require("./ProductAttributeModel");
const ProductBasket = require("./ProductBasketModel");
const ProductSuggestion = require("./ProductSuggestionModel");
const User = require("./UserModel");
const Role = require("./RoleModel");
const Address = require("./AddressModel");

// دسته بندی و محصول
Category.hasMany(Product, {
  foreignKey: "CategoryId",
  as: "Products",
});
Product.belongsTo(Category, {
  foreignKey: "CategoryId",
  as: "Category",
});

// محصول و جزئیات محصول
Product.hasMany(ProductDetail, {
  foreignKey: "ProductId",
  as: "ProductDetails",
});
ProductDetail.belongsTo(Product, {
  foreignKey: "ProductId",
  as: "Product",
});

// جزئیات محصول و ویژگی محصول
ProductDetail.hasMany(ProductAttribute, {
  foreignKey: "ProductDetailId",
  as: "ProductAttributes",
});
ProductAttribute.belongsTo(ProductDetail, {
  foreignKey: "ProductDetailId",
  as: "ProductDetail",
});

// محصول و سبد محصولات
Product.hasMany(ProductBasket, {
  foreignKey: "ProductId",
  as: "ProductBaskets",
});
ProductBasket.belongsTo(Product, {
  foreignKey: "ProductId",
  as: "Product",
});

// سبد محصول و پیشنهاد محصول
ProductBasket.hasMany(ProductAttribute, {
  foreignKey: "ProductAttributeId",
  as: "ProductAttributes",
});
ProductAttribute.belongsTo(ProductBasket, {
  foreignKey: "ProductAttributeId",
  as: "ProductBasket",
});

// سبد محصولات و پیشنهاد محصول
ProductBasket.hasMany(ProductSuggestion, {
  foreignKey: "ProductBasketId",
  as: "ProductSuggestions",
});
ProductSuggestion.belongsTo(ProductBasket, {
  foreignKey: "ProductBasketId",
  as: "ProductBasket",
});

// کاربر و نقش‌ ها
User.hasOne(Role, {
  foreignKey: "UserId",
  as: "Role",
});
Role.belongsTo(User, {
  foreignKey: "UserId",
  as: "User",
});

// رابطه بین کاربر و آدرس‌ ها
User.hasMany(Address, {
  foreignKey: "UserId",
  as: "Addresses",
});
Address.belongsTo(User, {
  foreignKey: "UserId",
  as: "User",
});
