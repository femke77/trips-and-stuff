const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
class Traveller extends Model {}

Traveller.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      len: [6],
      validate: {
        isAlphanumeric: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (traveller) => {
        try {
          traveller.password = await bcrypt.hash(traveller.password, 10);
          return traveller;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      beforeUpdate: async (updatedTraveller) => {
        try {
          updatedTraveller.password = await bcrypt.hash(
            updatedTraveller.password,
            10
          );
          return updatedTraveller;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: "traveller",
  }
);

module.exports = Traveller;
