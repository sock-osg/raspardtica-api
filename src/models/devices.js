'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devices', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    address: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        is: /^0x[\da-f]+ll$/i
      }
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1,
        max: 13
      }
    },
    alias: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    deviceTypeConfigurationsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'deviceTypeConfigurations',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isSecure: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    cron: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    validateWeather: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'OFF',
      validate: {
        isIn: [['ON', 'OFF']]
      }
    },
  },
  {
    tableName: 'devices',
    classMethods: {
      associate: function(models) {
        models.devices.belongsTo(models.users);
        models.devices.belongsTo(models.deviceTypeConfigurations);
      }
    }
  });
};
