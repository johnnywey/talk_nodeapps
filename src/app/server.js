'use strict';
/**
 * Main entry point to our HTTP server.
 */
var connect = require('connect');
var restify = require('restify');
var Cookies = require('cookies');
var serveStatic = require('serve-static');
var apiRoutes = require('./routes/apiRoutes.js');
var bootstrap = require('./bootstrap').bootstrap;

var port = process.env.PORT || 8000;
var name = 'Sweet Web App';

// Restify config
var api = restify.createServer({
    name: name,
    formatters: {
        '*/*': function forceApplicationJson(req, res, body) {
            var data = JSON.stringify(body);
            res.setHeader('Content-Length', Buffer.byteLength(data));
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return data;
        }
    }
});
api.use(restify.queryParser());

// Connect config and app start
var connectApp = connect()
    .use(Cookies.express())
    .use(serveStatic('public'));

// Setup routes
apiRoutes.route(connectApp, api);

connectApp.listen(port, function() {
    var divider = '================================================================';
    var startUpData = '\n' + divider;
    startUpData += '\n=                         ' + name + '                        =';
    startUpData += '\n' + divider;
    startUpData += '\nServer listening on [' + port + ']\n';
    startUpData += divider;
    console.log(startUpData);
    bootstrap();
});
