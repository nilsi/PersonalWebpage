'use strict';

angular.module('app.directives').directive('clickMap',
    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    scope.$apply(attrs.clickMap);
                });
            }
        };
    }
);
