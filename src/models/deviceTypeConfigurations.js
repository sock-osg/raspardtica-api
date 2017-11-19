'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deviceTypeConfigurations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isSecureRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    cronRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    validateWeatherRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  }, {
    tableName: 'deviceTypeConfigurations',
    classMethods: {
      associate: function(models) {
        models.deviceTypeConfigurations.hasMany(models.devices);
      }
    }
  });
};
