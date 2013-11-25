'use strict';

var mockRequire = require('sandboxed-module');
var should = require('should');

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
});