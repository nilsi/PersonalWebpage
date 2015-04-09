'use strict';

angular.module('app.controllers').controller('PageCtrl', ['$scope','$rootScope', '$translate','$timeout', 'SidebarService',
    function($scope, $rootScope, $translate, $timeout, SidebarService) {

        $scope.expanded = SidebarService.isExpanded;

        $translate('START').then(function (translation) {
    		$scope.start = translation;
		});

		$scope.setFinished = function() {
			$scope.finishedTyping = true;
		};

    }
]);
