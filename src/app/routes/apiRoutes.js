'use strict';
/**
 * Routes for our API.
 */
var userService = require('../services/userService').userService;
var authRouter = require('../routes/authRouter').authRouter;
var restify = require('restify');

var _apiRoutes = function(connect, api) {

    // Helper function to authenticate routes that only internal users can follow.
    function authenticateInternal(req, res, next) {
        if (!authRouter.isInternalAdmin(req)) {
            return next(new restify.NotAuthorizedError({body: 'Access to internal functions denied.'}));
        }
        return next();
    }

    // This section wires /api requests into restify
    connect.use('/api', function(req, res) {
        api.server.emit('request', req, res);
    });

    // API routes.
    api.get('/user', [authenticateInternal, userService.list]);
    api.get('/user/:id', userService.show);
};

exports.route = function(connect, api) {
    _apiRoutes(connect, api);
};