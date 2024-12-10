const { DataTypes } = require("sequelize");
const sequelize = require("./ConfigDataBase");

const Address = sequelize.define(
  "Address",
  {
    AddressId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "UserId",
      },
      onDelete: "CASCADE",
    },
    Province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ZipCode: {
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
    tableName: "Address",
    timestamps: true,
  }
);

module.exports = Address;
