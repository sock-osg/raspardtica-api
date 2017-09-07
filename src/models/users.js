'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(90),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'users',
    classMethods: {
      associate: function (models) {
          models.users.hasMany(models.devices);
      }
    }
  });
};
