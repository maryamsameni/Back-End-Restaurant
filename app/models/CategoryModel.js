const { DataTypes } = require("sequelize");
const sequelize = require("./ConfigDataBase");

const Category = sequelize.define(
  "Category",
  {
    CategoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    SortOrder: {
      type: DataTypes.INTEGER,
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
    tableName: "Category",
    timestamps: true,
  }
);

module.exports = Category;
