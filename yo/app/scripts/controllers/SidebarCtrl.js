'use strict';

angular.module('app.controllers').controller('SidebarCtrl', ['$scope', '$http','$translate', 'SidebarService',
    function($scope, $http ,$translate, SidebarService) {

        $scope.selectedCountry = SidebarService.getSelectedCountry();
        $scope.messages = SidebarService.getMessages();

        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
        };
        
        $scope.toggleMenu = function() {
            SidebarService.toggleExpanded();
        };
    }
]);
