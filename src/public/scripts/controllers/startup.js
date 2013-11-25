/**
 * Defines what happens when the application starts up.
 */
(function() {
    'use strict';
    angular.module('WebApp').controller('StartupCtrl', ['$scope', '$rootScope', 'ApiService', function($scope, $rootScope, apiService) {
        $scope.init = function() {
            // Grab configuration and do stuff with it.
            apiService.models.ApplicationConfig.get(function(config) {
                // Add config to $rootScope so it is available to all controllers
                $rootScope.applicationConfig = config;

                // Emit event for other handlers
                $rootScope.$emit('started');
            });
        };
    }]);
})();
