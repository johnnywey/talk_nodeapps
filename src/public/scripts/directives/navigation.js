/**
 * Function to display and update the main navigation menu across the top of the screen.
 */
(function() {
    'use strict';
    angular.module('WebApp').directive('navigation', ['$location', function(location) {
        return {
            restrict: 'A',
            link: function(scope, ul) {
                var tabs = ul.children();
                var tabMap = {};
                angular.forEach(tabs, function(li) {
                    var a = li.querySelector('a');
                    // Substring 1 to remove the # at the beginning (because location.path() below does not return the #)
                    if (a) {
                        tabMap[a.getAttribute('href').substring(1)] = li;
                    }
                });

                scope.location = location;
                scope.$watch('location.path()', function(newPath) {
                    for (var i = 0; i < tabs.length; i++) {
                        tabs[i].classList.remove('active');
                    }
                    tabMap[newPath].classList.add('active');
                });
            }
        };
    }]);
})();