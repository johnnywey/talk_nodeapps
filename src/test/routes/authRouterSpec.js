'use strict';

var mockRequire = require('sandboxed-module');
var User = require('../../app/models/models').User;
var validRoles = require('../../app/models/models').roles.validRoles;

describe('AuthRouter', function() {
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