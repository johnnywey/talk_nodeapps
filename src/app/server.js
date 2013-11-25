'use strict';
/**
 * Main entry point to our HTTP server.
 */
var connect = require('connect');
var restify = require('restify');
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
        key: 'WEBAPP_AUTH',
        store: store,
        cookie: {
            secure: false
        }
    };
};

// Connect config and app start
var SessionStore = require('connect-mongo')(connect);
var connectApp = connect()
    .use(connect.cookieParser())
    .use(connect.session(session(new SessionStore({url: 'mongodb://localhost/webapp_test/sessions'}))))
    .use(connect.static('public'));

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
