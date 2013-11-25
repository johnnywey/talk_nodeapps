'use strict';

/**
 * Control our authorization and authentication.
 */
var validRoles = require('../models/models').roles.validRoles;

/**
 * See if a given request session is marked to allow internal access.
 */
var _isInternalAdmin = function(req) {
    if (req.session && req.session.user) {
        return req.session.user.roles.indexOf(validRoles.internal) > -1;
    }
    return false;
};

exports.authRouter = {
    isInternalAdmin: _isInternalAdmin
};