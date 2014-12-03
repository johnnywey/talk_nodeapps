'use strict';
/**
 * Main entry point to our HTTP server.
 */
var connect = require('connect');
var restify = require('restify');
var cookies = require('cookies');
var expressSession = require('express-session');
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

// Secure cookie session config
var session = function(store) {
    return {
        secret: 'keyboard cat',
        name: 'WEBAPP_AUTH',
        store: store,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    };
};

// Connect config and app start
var MongoStore = require('connect-mongo')(expressSession);
var connectApp = connect()
    .use(expressSession(session(new MongoStore({url: 'mongodb://localhost/webapp_test/sessions'}))))
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
