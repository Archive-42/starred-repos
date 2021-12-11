'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    category: DataTypes.STRING,
    details: DataTypes.TEXT,
    mapUrl: DataTypes.STRING,
    helperId: DataTypes.INTEGER,
    helpeeId: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};