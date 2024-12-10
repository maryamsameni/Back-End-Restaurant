const { DataTypes } = require("sequelize");
const sequelize = require("./ConfigDataBase");

const ProductSuggestion = sequelize.define(
  "ProductSuggestion",
  {
    ProductSuggestionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "ProductSuggestion",
    timestamps: true,
  }
);

module.exports = ProductSuggestion;
