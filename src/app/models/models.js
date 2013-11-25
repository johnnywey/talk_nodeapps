'use strict';
/**
 * Models.
 */
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var DEFAULT_AVATAR_URL = '/images/no-avatar.png';

// User roles we allow.
var roles = (function() {
    var _validRoles = {
        internal: 'internal',
        administrator: 'administrator',
        user: 'user'
    };

    var _rolesArray = [];
    for (var r in _validRoles) {
        if (_validRoles.hasOwnProperty(r)) {
            _rolesArray.push(r);
        }
    }

    return {
        validRoles: _validRoles,
        rolesArray: _rolesArray
    };
})();

/**
 * User.
 */
var userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true},
    username: {type: String, index: {unique: true, dropDupes: true}, required: true},
    password: {type: String, required: true},
    roles: [
        {type: String, 'enum': roles.rolesArray}
    ],
    imageUrl: {type: String, default: DEFAULT_AVATAR_URL, required: true},
    active: {type: Boolean, default: true, required: true},
    createTime: {type: Date, default: Date.now, required: true}
});

exports.User = mongoose.model('User', userSchema);
exports.defaults = {
    DEFAULT_AVATAR_URL: DEFAULT_AVATAR_URL
}
exports.roles = roles;

// This is wrapped with a disconnect call in order to facilitate restarts in dev.
exports.connectToDatabase = function(url, callback) {
    mongoose.disconnect();
    setTimeout(function() {
        mongoose.connect(url);
        if (callback) {
            callback();
        }
    }, 1500);
};
