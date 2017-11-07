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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    twitter: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
      validate: {
        is: /^@.+$/i
      }
    },
    userType: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
      validate: {
        isIn: [['ROOT', 'MASTER', 'SLAVE']]
      }
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
