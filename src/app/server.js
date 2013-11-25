'use strict';
/** 
 * Main entry point to our HTTP server.
 */
var connect = require('connect');
var port = process.env.PORT || 8000;

// Connect config and app start
var connectApp = connect()
    .use(connect.bodyParser())
    .use(connect.query())
    .use(connect.cookieParser())
    .use(connect.static('public'));

connectApp.listen(port, function() {
    var divider = '================================================================';
    var startUpData = '\n' + divider;
    startUpData += '\n=                          Sweet Web App                        =';
    startUpData += '\n' + divider;
    startUpData += '\nServer listening on [' + port + ']\n';
    startUpData += divider;
    console.log(startUpData);
});
