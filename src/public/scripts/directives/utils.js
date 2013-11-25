/**
 * Various utility directives.
 */
(function() {
    'use strict';

    angular.module('WebApp').directive('stopevent', [function() {
            /**
             * Stop an event from propagating.
             *
             * @param attr.stopEvent The event name to keep from bubbling out
             */
            return {
                restrict: 'A',
                link: function(scope, el, attr) {
                    el.bind(attr.stopevent, function(e) {
                        e.stopPropagation();
                    });
                }
            };
        }]).directive('focus', ['$timeout', function($timeout) {
            /**
             * Focus on an input field.
             *
             * @param attr.focus {@type boolean} Perform focus on element
             */
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    scope.$watch(attr.focus, function(value) {
                        if (value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }]).directive('capitalize', [function() {
            /**
             * Capitalize an input field input text.
             */
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, element, attrs, modelCtrl) {
                    var capitalize = function(inputValue) {
                        var capitalized = angular.uppercase(inputValue);
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    };
                    modelCtrl.$parsers.push(capitalize);
                    capitalize(scope[attrs.ngModel]);
                }
            };
        }]);
})();