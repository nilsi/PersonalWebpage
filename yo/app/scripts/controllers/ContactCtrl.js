'use strict';
angular.module('app.controllers').controller('ContactCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.submit = function() {
            $scope.loading = true;
            $http({
                url: '/contact',
                method: 'POST',
                params: this.formData
            }).success(function() {
                $scope.success = true;
            }).error(function() {
                $scope.error = true;
            }).finally(function() {
                $scope.loading = false;
            });
        };
    }
]);
