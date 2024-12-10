const { DataTypes } = require("sequelize");
const sequelize = require("./ConfigDataBase");

const ProductAttribute = sequelize.define(
  "ProductAttribute",
  {
    ProductAttributeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ProductDetail",
        key: "ProductDetailId",
        onDelete: "CASCADE",
      },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Options: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    StockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "ProductAttribute",
    timestamps: true,
  }
);

module.exports = ProductAttribute;
