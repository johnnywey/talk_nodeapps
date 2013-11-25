/**
 * Suite of functions to communicate with our server.
 *
 * INTERNAL API ACCESS FUNCTIONS DO NOT GO HERE. See the {@link InternalApiService} for those.
 */
(function() {
    'use strict';
    angular.module('WebApp').factory('ApiService', ['$resource', '$http', function($resource) {
        var models = {};
        models.ApplicationConfig = $resource('/api/setup');
        return {models: models};
    }]);
})();