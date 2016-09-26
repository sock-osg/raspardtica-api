'use strict';
var User = require('../../../models/users');

var usersController = {};

usersController.create = function(req, res) {
  User.create({
    username: req.body.username,
    fullName: req.body.fullName
  }, function(err, user) {
    if (err) {
      res.json(err);
      res.status(500);
    }
    res.header('Location', 'users/' + user._id);
    res.status(201);
    res.json(user);
  });
};

usersController.routes = [
  {
    route: '/create',
    method: 'post',
    action: 'create'
  }
];

module.exports = usersController;
