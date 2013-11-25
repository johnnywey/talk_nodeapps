'use strict';

var mockRequire = require('sandboxed-module');
var should = require('should');
var User = require('../../app/models/models').User;

describe('UserService', function() {
    describe('#list', function() {
        it('should return 404 when no users are found', function(done) {
            var mockRes = {
                send: function(code) {
                    code.should.equal(404);
                }
            };

            var mockUserModel = {
                User: {
                    find: function(query, exclude, callback) {
                        should.exist(query);
                        exclude.password.should.equal(0);
                        callback(null, null);
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            unit.list({}, mockRes, done);
        });

        it('should return 200 and users', function(done) {
            var mockRes = {
                send: function(code, body) {
                    code.should.equal(200);
                    body.length.should.equal(2);
                }
            };

            var mockUserModel = {
                User: {
                    find: function(query, exclude, callback) {
                        should.exist(query);
                        exclude.password.should.equal(0);
                        callback(null, [
                            {},
                            {}
                        ]);
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            unit.list({}, mockRes, done);
        });
    });

    describe('#show', function() {
        it('should return 404 when user is not found', function(done) {
            var mockRes = {
                send: function(code) {
                    code.should.equal(404);
                }
            };

            var mockUserModel = {
                User: {
                    findOne: function(query, exclude, callback) {
                        query._id.should.equal("123");
                        exclude.password.should.equal(0);
                        callback(null, null);
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            unit.show({params: {id: "123"}}, mockRes, done);
        });

        it('should return 200 and user', function(done) {
            var mockRes = {
                send: function(code, body) {
                    code.should.equal(200);
                    body.username.should.equal('test');
                }
            };

            var mockUserModel = {
                User: {
                    findOne: function(query, exclude, callback) {
                        query._id.should.equal("123");
                        exclude.password.should.equal(0);
                        callback(null, {username: 'test'});
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            unit.show({params: {id: "123"}}, mockRes, done);
        });
    });

    describe('#authenticate', function() {
        it('should fail when user cannot be found', function(done) {
            var mockUserModel = {
                User: {
                    findOne: function(query, callback) {
                        query.username.should.equal('testuser');
                        callback(null);
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            var callback = function(user) {
                should.not.exist(user);
                done();
            };

            unit.authenticate('testUser', null, callback);
        });

        it('should fail when user passwords do not match', function(done) {
            var mockUserModel = {
                User: {
                    findOne: function(query, callback) {
                        query.username.should.equal('testuser');
                        callback({password: 'test'});
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            var callback = function(user) {
                should.not.exist(user);
                done();
            };

            unit.authenticate('testUser', 'blah', callback);
        });

        it('happy path', function(done) {
            var mockUserModel = {
                User: {
                    findOne: function(query, callback) {
                        query.username.should.equal('success');
                        return callback(null, new User({
                                password: '$2a$10$PintGuw8H2bswR/66DqUlueMoJ5yGj35s2GHNz.2SS0hhTgLUNEyO',
                                username: 'test'
                            }
                        ));
                    }
                }
            };

            var unit = mockRequire.require('../../app/services/userService', {
                requires: {
                    '../models/models': mockUserModel
                }
            }).userService;

            var callback = function(user) {
                should.exist(user);
                done();
            };

            unit.authenticate('SUCCESS', 'TEST', callback);
        });
    });
});