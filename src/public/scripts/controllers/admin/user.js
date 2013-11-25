/**
 * Admin control for updating / creating users and other related functions.
 */
(function() {
    'use strict';

    angular.module('WebApp').controller('UserCtrl', ['$scope', 'InternalApiService', function($scope, api) {
        $scope.focusUserSearch = false;
        $scope.users = [];

        /**
         * List users. Uses a toggle in order to open / close the UI list.
         */
        $scope.list = function() {
            if ($scope.users.length) {
                $scope.users = [];
                $scope.focusUserSearch = false;
            } else {
                api.User.get(function(data) {
                    $scope.users = data;
                });
            }
        };
    }]);
})();