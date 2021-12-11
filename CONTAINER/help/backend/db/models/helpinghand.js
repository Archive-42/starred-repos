'use strict';
module.exports = (sequelize, DataTypes) => {
  const HelpingHand = sequelize.define('HelpingHand', {
    likerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  HelpingHand.associate = function(models) {
    // associations can be defined here
  };
  return HelpingHand;
};