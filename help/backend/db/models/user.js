'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName, helpType, address, city, state, zipCode, avatar} = this; // context will be the User instance
      return { id, username, email, firstName, lastName, helpType, address, city, state, zipCode, avatar };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, helpType, avatar, bio, firstName, lastName, address, city, state, zipCode, lat, lng }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        address,
        city,
        state,
        zipCode,
        hashedPassword,
        firstName,
        lastName,
        helpType,
        avatar,
        bio,
        lat,
        lng
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      User.belongsToMany(models.User, {through: "Tasks", as: "helperTask", foreignKey: "helpeeId", otherKey: "helperId"});
      User.belongsToMany(models.User, {through: "Tasks", as: "helpeeTask", foreignKey: "helperId", otherKey: "helpeeId" });
      User.belongsToMany(models.User, {through: "Testimonies", as: "userTestimony", foreignKey: "commenterId", otherKey: "userId"});
      User.belongsToMany(models.User, {through: "Testimonies", as: "commenterTestimony", foreignKey: "userId", otherKey: "commenterId" });
      User.belongsToMany(models.User, {through: "helpingHands", as: "likerHands", foreignKey: "userId", otherKey: "likerId"});
      User.belongsToMany(models.User, {through: "helpingHands", as: "userHands", foreignKey: "likerId", otherKey: "userId"});
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      helpType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lat: {
        type: DataTypes.FLOAT(20),
        allowNull: false
      },
      lng: {
        type: DataTypes.FLOAT(20),
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING
      },
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};