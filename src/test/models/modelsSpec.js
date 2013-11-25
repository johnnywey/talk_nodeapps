'use strict';

/**
 * Tests for models.
 */
describe('Models', function() {
	describe('#User', function() {
		it('should set default avatar image', function() {
			var User = require('../../app/models/models').User;
			var DEFAULT_AVATOR = require('../../app/models/models').defaults.DEFAULT_AVATAR_URL;
			var unit = new User();
			unit.imageUrl.should.equal(DEFAULT_AVATOR);
		});
	});

	describe('#roles', function() {
		it('should have the roles we expect', function() {
			var roles = require('../../app/models/models').roles;
			for(var role in roles.validRoles) {
				roles.rolesArray.should.include(role);
			}
			roles.rolesArray.should.not.include('FOO');
		});
	});
});