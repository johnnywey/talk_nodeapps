'use strict';

var mockRequire = require('sandboxed-module');
var validRoles = require('../../app/models/models').roles.validRoles;
var User = require('../../app/models/models').User;
var extend = require('util-extend');
var should = require('should');

describe('AuthRouter', function() {
    describe('#login()', function() {
        it('should redirect to login when GETing', function() {
            var mockRes = {
                statusCode: null,
                end: function() {
                    this.statusCode.should.equal(302);
                },
                setHeader: function(name, value) {
                    name.should.equal('Location');
                    value.should.equal('/login.html');
                }
            };

            var mockReq = {
                method: 'GET'
            };

            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;
            unit.login(mockReq, mockRes);
        });

        it('should redirect to error when missing username or password', function() {
            var mockRes = {
                statusCode: null,
                end: function() {
                    this.statusCode.should.equal(302);
                },
                setHeader: function(name, value) {
                    name.should.equal('Location');
                    value.should.equal('/login.html?error=true');
                }
            };
            var mockReq = {
                body: {},
                method: 'POST'
            };

            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;

            // missing password
            mockReq.body.username = 'TESTUSER';
            unit.login(mockReq, mockRes);

            // missing password
            delete mockReq.body.username;
            mockReq.body.password = 'TESTPASSWORD';
            unit.login(mockReq, mockRes);
        });

        it('should redirect upon auth failure', function(done) {
            var BAD_USER = 'BAD';
            var PASSWORD = 'password';

            var mockRes = {
                statusCode: null,
                end: function() {
                    this.statusCode.should.equal(302);
                    done();
                },
                setHeader: function(name, value) {
                    name.should.equal('Location');
                    value.should.equal('/login.html?error=true');
                }
            };
            var mockUserService = {
                userService: {
                    authenticate: function(username, password, callback) {
                        password.should.equal(PASSWORD);
                        callback(null);
                    }
                }
            };
            var mockReq = {
                body: {},
                method: 'POST'
            };

            var unit = mockRequire.require('../../app/routes/authRouter', {
                requires: {
                    '../services/userService': mockUserService
                }
            }).authRouter;

            // bad user
            mockReq.body.password = PASSWORD;
            mockReq.body.username = BAD_USER;
            unit.login(mockReq, mockRes);
        });

        it('should 403 upon auth failure with api', function() {
            var BAD_USER = 'BAD';
            var PASSWORD = 'password';

            var mockUserService = {
                userService: {
                    authenticate: function(username, password, callback) {
                        password.should.equal(PASSWORD);
                        callback(null);
                    }
                }
            };

            var mockReq = {
                body: {},
                method: 'POST',
                path: function() {return '/api/customer/create';}
            };

            var mockRes = {
                end: function(dataToWrite) {
                    dataToWrite.should.include('Invalid credentials');
                },
                writeHead: function(code, options) {
                    code.should.equal(403);
                    should.exist(options['Content-Length']);
                    should.exist(options['Content-Type']);
                }
            };

            var unit = mockRequire.require('../../app/routes/authRouter', {
                requires: {
                    '../services/user': mockUserService
                }
            }).authRouter;

            // bad user
            mockReq.body.password = PASSWORD;
            mockReq.body.username = BAD_USER;
            unit.isLoggedIn()(mockReq, mockRes);
        });

        it('should redirect upon auth success', function(done) {
            var GOOD_USER = 'GOOD';
            var PASSWORD = 'password';

            var mockReq = {
                body: {},
                method: 'POST',
                session: {}
            };

            var mockRes = {
                statusCode: null,
                end: function() {
                    this.statusCode.should.equal(302);
                    done();
                },
                setHeader: function(name, value) {
                    name.should.equal('Location');
                    value.should.equal('/');
                }
            };

            var mockUserService = {
                userService: {
                    authenticate: function(username, password, callback) {
                        password.should.equal(PASSWORD);
                        username.should.equal(GOOD_USER);
                        callback({'username': GOOD_USER});
                    }
                }
            };
            var unit = mockRequire.require('../../app/routes/authRouter', {
                requires: {
                    '../services/userService': mockUserService
                }
            }).authRouter;

            // bad user
            mockReq.body.password = PASSWORD;
            mockReq.body.username = GOOD_USER;
            unit.login(mockReq, mockRes);
        });
    });

    describe('#isLoggedIn()', function() {
        it('should white list paths', function() {
            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;
            var next = function() {return true;};

            unit.isLoggedIn()({path: function() {return '/login.html';}}, {}, next).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/styles/test.css';}}, {}, next).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/styles/fonts/test.otf';}}, {}, next).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/images/pic.png';}}, {}, next).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/scripts/happy.js';}}, {}, next).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/api/site/1234';}}, {}, next).should.equal(true);
        });

        it('should NOT white list paths with admin in them', function() {
            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;

            var mockRes = {
                end: function() {
                    return true;
                }
            };

            // Not allow because user is not admin
            unit.isLoggedIn()({path: function() {return '/login/internalAdmin/admin.html';}}, mockRes).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/styles/admin.css';}}, mockRes).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/styles/fonts/admin.otf';}}, mockRes).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/images/admin.png';}}, mockRes).should.equal(true);
            unit.isLoggedIn()({path: function() {return '/scripts/admin.js';}}, mockRes).should.equal(true);
        });

        it('should redirect to login when there is no session and continue when there is one', function() {
            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;

            // no req.session
            var mockReq = {path: function() {return '/';}};
            var mockRes = {
                statusCode: null,
                end: function() {
                    this.statusCode.should.equal(302);
                },
                setHeader: function(name, value) {
                    name.should.equal('Location');
                    value.should.equal('/login.html');
                }
            };

            unit.isLoggedIn()(mockReq, mockRes);

            // no req.session.user
            mockReq.session = {};
            unit.isLoggedIn()(mockReq, mockRes);

            // happy path
            var next = function() {
                return true;
            };
            mockReq.session.user = {};
            unit.isLoggedIn()(mockReq, {}, next).should.equal(true);

            // Should allow admin assets as well
            unit.isLoggedIn()(extend({path: function() {return '/login/internalAdmin/admin.html';}}, mockReq), {}, next).should.equal(true);
            unit.isLoggedIn()(extend({path: function() {return '/styles/admin.css';}}, mockReq), {}, next).should.equal(true);
            unit.isLoggedIn()(extend({path: function() {return '/styles/fonts/admin.otf';}}, mockReq), {}, next).should.equal(true);
            unit.isLoggedIn()(extend({path: function() {return '/images/admin.png';}}, mockReq), {}, next).should.equal(true);
            unit.isLoggedIn()(extend({path: function() {return '/scripts/admin.js';}}, mockReq), {}, next).should.equal(true);
        });
    });

    describe('#logout()', function() {
        it('should destroy session and redirect to login', function(done) {
            var mockReq = {session: {destroy: function(callback) {
                callback();
            }}};
            var mockRes = {
                statusCode: null,
                end: function() {
                    this.statusCode.should.equal(302);
                    done();
                },
                setHeader: function(name, value) {
                    name.should.equal('Location');
                    value.should.equal('/login.html');
                }
            };
            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;
            unit.logout(mockReq, mockRes);
        });
    });

    describe('#isInternalAdmin()', function() {
        it('should properly show internal admin status', function() {
            var unit = mockRequire.require('../../app/routes/authRouter').authRouter;
            unit.isInternalAdmin({}).should.equal(false);
            unit.isInternalAdmin({session: {}}).should.equal(false);
            unit.isInternalAdmin({session: {user: new User()}}).should.equal(false);
            unit.isInternalAdmin({session: {user: new User({roles: [validRoles.user]})}}).should.equal(false);
            unit.isInternalAdmin({session: {user: new User({roles: [validRoles.user, validRoles.internal]})}}).should.equal(true);
        });
    });
});