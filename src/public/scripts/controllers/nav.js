(function() {
    'use strict';
    /**
     * Routes. This controls what view gets rendered when the url changes.
     */
    angular.module('WebApp').config(function($routeProvider) {
        $routeProvider.when('/admin', {templateUrl: 'views/internalAdmin/admin.html'})
            .when('/main', {templateUrl: 'views/main.html'})
            .otherwise({redirectTo: '/main'});
    });

    /**
     * Controller to handle additional things related to navigation.
     */
    angular.module('WebApp').controller('NavCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        /**
         * If the user is internal admin, display value in the view.
         */
        $scope.isInternalAdmin = false;

        $rootScope.$on('started', function() {
            if ($rootScope.applicationConfig) {
                var roles = $rootScope.applicationConfig.roles;
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i] === 'internal') {
                        $scope.isInternalAdmin = true;
                    }
                }
            }
        });
    }]);
})();
