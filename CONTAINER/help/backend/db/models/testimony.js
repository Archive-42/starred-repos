'use strict';
module.exports = (sequelize, DataTypes) => {
  const Testimony = sequelize.define('Testimony', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    commenterId: DataTypes.INTEGER
  }, {});
  Testimony.associate = function(models) {
    // associations can be defined here
  };
  return Testimony;
};