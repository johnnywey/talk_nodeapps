'use strict';

/**
 * Control our authorization and authentication.
 */
var userService = require('../services/userService').userService;
var validRoles = require('../models/models').roles.validRoles;

var _loginPath = '/login.html';
var _loginErrorPath = _loginPath + '?error=true';

/**
 * Fire off a redirect.
 */
var _redirect = function(res, to) {
    res.statusCode = 302;
    res.setHeader('Location', to);
    return res.end();
};

/**
 * Simple send an empty string rather than servicing request.
 */
var _sendEmptyString = function(res) {
    res.statusCode = 200;
    return res.end('', 'utf8');
};

/**
 * Handle log in.
 */
var _login = function(req, res) {
    if (req.method === 'POST') {
        if (!(req.body.username && req.body.password)) {
            return _redirect(res, _loginErrorPath);
        }
        return userService.authenticate(req.body.username, req.body.password, function(result) {
            if (result) {
                req.session.user = result;
                return _redirect(res, '/');
            } else {
                return _redirect(res, _loginErrorPath);
            }
        });
    } else {
        // Rendering login for first time (GET)
        return _redirect(res, _loginPath);
    }
};

/**
 * See if a given request session is marked to allow internal access.
 */
var _isInternalAdmin = function(req) {
    if (req.session && req.session.user) {
        return req.session.user.roles.indexOf(validRoles.internal) > -1;
    }
    return false;
};

/**
 * See if a user is logged in. If not, redirect them to a login.
 */
var _isLoggedIn = function() {
    return function(req, res, next) {
        // Whitelisted paths that do not require auth ...
        if (req.path().toLowerCase().match(/\/login|\/styles|\/images|\/scripts|\/api\/site|\/poster|\/email/)) {
            // But gate paths that contain the admin phrase so even source can't be downloaded
            if (req.path().toLowerCase().indexOf('admin') > -1 && !_isInternalAdmin(req)) {
                // Write out a response so we don't get 404's in the browser
                return _sendEmptyString(res);
            }
            return next();
        }
        else if (!(req.session && req.session.user)) {
            if (req.path().toLowerCase().match(/\/api/)) {
                var body = 'Invalid credentials';
                res.writeHead(403, {
                    'Content-Length': body.length,
                    'Content-Type': 'application/json'});
                return res.end(body);
            } else {
                return _redirect(res, _loginPath);
            }
        } else {
            return next();
        }
    };
};

/**
 * Logout a user and invalid their session.
 */
var _logout = function(req, res) {
    req.session.destroy(function() {
        return _redirect(res, _loginPath);
    });
};

exports.authRouter = {
    isLoggedIn: _isLoggedIn,
    isInternalAdmin: _isInternalAdmin,
    login: _login,
    logout: _logout
};
