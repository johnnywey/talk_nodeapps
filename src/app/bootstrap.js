'use strict';
/**
 * Bootstrap application stuff.
 */
var models = require('./models/models');
var userService = require('./services/userService').userService;

/**
 * Bootstrap some test data.
 */
var bootStrapTestData = function() {
    var testUser1 = new models.User(
        {
            firstName: 'Admin',
            lastName: 'user',
            emailAddress: 'testAdmin@test.com',
            password: userService.createPassword('secret'),
            username: 'admin',
            roles: [models.roles.validRoles.internal]
        });

    var testUser2 = new models.User(
        {
            firstName: 'User',
            lastName: 'User',
            emailAddress: 'testUser@test.com',
            password: userService.createPassword('secret'),
            username: 'user',
            roles: [models.roles.validRoles.user]
        });

    testUser1.save(function(error) {
        if (error) {
            console.log('Error saving user: ' + JSON.stringify(error));
        }
    });

    testUser2.save(function(error) {
        if (error) {
            console.log('Error saving user: ' + JSON.stringify(error));
        }
    });
};

/**
 * Start the database connection for mongoose.
 */
var _start = function() {
    models.connectToDatabase('mongodb://localhost/webapp_test', function() {
        models.User.findOne({}, function(err, doc) {
            if (err) {
                return console.log('Could not query mongoDB store!');
            }
            if (!doc) {
                return bootStrapTestData();
            } else {
                return console.log('Ignoring recreating bootstrap data ...');
            }
        });
    });
};

exports.bootstrap = _start;