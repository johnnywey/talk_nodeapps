'use strict';
/**
 * Routes for our API.
 */
var userService = require('../services/userService').userService;

var _apiRoutes = function(connect, api) {
    // This section wires /api requests into restify
    connect.use('/api', function(req, res) {
        api.server.emit('request', req, res);
    });

    // API routes.
    api.get('/user', userService.list);
    api.get('/user/:id', userService.show);
};

exports.route = function(connect, api) {
    _apiRoutes(connect, api);
};