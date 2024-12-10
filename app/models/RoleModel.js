const sequelize = require("./ConfigDataBase");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "Role",
  {
    RoleId: {
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    Type: {
      type: DataTypes.ENUM("CUSTOMER", "ADMIN"),
      allowNull: false,
      defaultValue: "CUSTOMER",
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
    tableName: "Role",
    timestamps: true,
  }
);

module.exports = Role;
