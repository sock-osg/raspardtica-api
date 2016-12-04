'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devices', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nrf_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'devices',
    classMethods: {
      associate: function(models) {
        models.devices.belongsTo(models.users);
      }
    }
  });
};
