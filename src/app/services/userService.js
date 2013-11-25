'use strict';

/**
 * Functions to help CRUD users.
 */
var User = require('../models/models').User;

var NOT_FOUND = {
    error: true,
    message: 'User not found.'
};

/**
 * List all on file.
 */
var _list = function(req, res, next) {
    return User.find({}, {password: 0}, function(error, users) {
        if (!users) {
            res.send(404, NOT_FOUND);
        } else {
            res.send(200, users);
        }
        return next();
    });
};

/**
 * Get one by id.
 */
var _show = function(req, res, next) {
    return User.findOne({_id: req.params.id}, {password: 0}, function(error, user) {
        if (!user) {
            res.send(404, NOT_FOUND);
        } else {
            res.send(200, user);
        }
        return next();
    });
};

exports.userService = {
    list: _list,
    show: _show
};