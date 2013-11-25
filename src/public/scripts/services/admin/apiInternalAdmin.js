/**
 * Internal API services.
 */
(function() {
    'use strict';
    angular.module('WebApp').factory('InternalApiService', ['$resource', function($resource) {
        var models = {};

        models.User = $resource('/api/user/:userId', {userId: '@_id'}, {
            get: {method: 'GET', isArray: true}
        });

        return models;
    }]);
})();