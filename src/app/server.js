'use strict';
/**
 * Main entry point to our HTTP server.
 */
var connect = require('connect');
var restify = require('restify');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var apiRoutes = require('./routes/apiRoutes.js');
var bootstrap = require('./bootstrap').bootstrap;
var authRouter = require('./routes/authRouter').authRouter;

var port = process.env.PORT || 8000;
var appName = 'Sweet Web App';

// Restify config
var api = restify.createServer({
    name: appName,
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
var session = function (store) {
    return {
        secret: 'keyboard cat',
        name: 'WEBAPP_AUTH',
        store: store,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    };
};

// Connect config and app start
var MongoStore = require('connect-mongo')(expressSession);

var connectApp = connect()
    .use(bodyParser())
    .use(expressSession(session(new MongoStore({url: 'mongodb://localhost/webapp_test/sessions'}))))
    .use(authRouter.isLoggedIn())
    .use(serveStatic('public'));

// Setup routes
apiRoutes.route(connectApp, api);

connectApp.listen(port, function () {
    var divider = '================================================================';
    var startUpData = '\n' + divider;
    startUpData += '\n=                         ' + appName + '                        =';
    startUpData += '\n' + divider;
    startUpData += '\nServer listening on [' + port + ']\n';
    startUpData += divider;
    console.log(startUpData);
    bootstrap();
});
