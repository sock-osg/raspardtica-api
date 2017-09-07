'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devices', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nrfId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
