"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require ("../../config");

var sequelize = new Sequelize('raspardtica-db', null, null, {
    dialect: config.db.dialect,
    storage: config.db.storage,
    pool: config.db.pool,
    define: {
      timestamps: false
    }
});

var db = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname,file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
