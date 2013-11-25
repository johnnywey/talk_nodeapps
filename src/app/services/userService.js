'use strict';

/**
 * Functions to help CRUD users.
 */
var User = require('../models/models').User;
var hasher = require('bcrypt-nodejs');
var sanitize = require('validator').sanitize;

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

/**
 * Lookup a user by username. Username should be case-insensitive and is normalized to lowercase.
 */
var _lookupUserByUsername = function(username, callback) {
    // Make sure they aren't trying to inject attack the DB
    var lcUser = sanitize(username.replace(/\$/gi, '')).xss().toLowerCase().substring(0, 30);

    User.findOne({username: lcUser, active: true}, function(error, user) {
        callback(user);
    });
};

/**
 * Given a username and hash of a password, locate the user.
 */
var _authenticate = function(username, password, callback) {
    _lookupUserByUsername(username, function(user) {
        if (!user) {
            return callback(null);
        }
        try {
            if (hasher.compareSync(password, user.password)) {
                return callback(user);
            }
        } catch (Exception) {
            // :INFO: RJW - Hasher throws an exception when the hash itself is invalid. Catch that here.
            console.log('Invalid hash for fetched user.');
        }
        return callback(null);
    });
};

/**
 * Get user setup information which includes the user information (minus password) and the relevant customer data.
 */
var _applicationConfig = function(req, res, next) {
    var user = req.session.user;
    return User.findOne({_id: user._id})
        .populate('customer')
        .exec(function(error, rUser) {
            if (error) {
                res.send(500, 'Unknown error.');
            } else {
                var jsonUser = {
                    firstName: rUser.firstName,
                    lastName: rUser.lastName,
                    emailAddress: rUser.emailAddress,
                    imageUrl: rUser.imageUrl,
                    roles: rUser.roles
                };

                res.send(200, jsonUser);
            }
            return next();
        });
};

/**
 * Create a password hash for a given plaintext password.
 */
var _createPassword = function(password) {
    return hasher.hashSync(password);
};

exports.userService = {
    list: _list,
    show: _show,
    authenticate: _authenticate,
    createPassword: _createPassword,
    applicationConfig: _applicationConfig
};