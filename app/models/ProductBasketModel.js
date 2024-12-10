const { DataTypes } = require("sequelize");
const sequelize = require("./ConfigDataBase");

const ProductBasket = sequelize.define(
  "ProductBasket",
  {
    ProductBasketId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product",
        key: "ProductId",
        onDelete: "CASCADE",
      },
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductAttributeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "ProductAttribute",
        key: "ProductAttributeId",
        onDelete: "CASCADE",
      },
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    OrderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductSuggestionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "ProductSuggestion",
        key: "ProductSuggestionId",
        onDelete: "CASCADE",
      },
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    tableName: "ProductBasket",
    timestamps: true,
  }
);

module.exports = ProductBasket;
