'use strict';

angular.module('app.controllers').controller('MapCtrl', ['$scope', '$http', 'SidebarService',
    function($scope, $http, SidebarService) {


        $scope.submit = function() {
            $scope.loading = true;
            $http({
                url: 'mark',
                method: 'POST',
                params: this.formData
            }).success(function(message) {
                $scope.getMessages(message.country);
                $scope.success = true;
            }).error(function() {
                $scope.error = true;
            }).finally(function() {
                $scope.loading = false;
            });
        };

        var touched = false;
        $scope.setLocation = function() {
            if (touched === false) {
                touched = true;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        $.getJSON('http://ws.geonames.org/countryCode', {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            username: 'nilsi',
                            type: 'JSON'
                        }, function(result) {
                            $scope.locationSet = true;
                            $scope.formData.lat = position.coords.latitude;
                            $scope.formData.long = position.coords.longitude;
                            $scope.formData.country = result.countryName;
                            $scope.$apply();
                        });
                    }, function() {
                        $scope.locationSet = false;

                    });
                }
            }
        };

        $scope.getMessages = function(countryName) {

            SidebarService.setExpanded(true);
            SidebarService.setSelectedCountry(countryName);

            $http({
                url: '/marksbycountry',
                method: 'GET',
                params: {
                    country : countryName
                }
            }).success(function(messages) {
                SidebarService.setMessages(messages);
            });
        };
    }
]);
