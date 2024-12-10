const { DataTypes } = require("sequelize");
const sequelize = require("./ConfigDataBase");

const Product = sequelize.define(
  "Product",
  {
    ProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "CategoryId",
        onDelete: "CASCADE",
      },
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    FinalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "Product",
    timestamps: true,
  }
);

module.exports = Product;
