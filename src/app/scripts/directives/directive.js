(function () {
    'use strict';

    angular.module('fs-angular-stat',[])
    .directive('fsStat', function($location, $timeout) {
        return {
            templateUrl: 'views/directives/stat.html',
            restrict: 'E',
            replace: false,
            transclude: {
		        action: '?fsStatAction'
		    },
            scope: {
               value: "@fsValue",
               label: "@fsLabel",
               sublabel: "@fsSublabel",
               icon: "@fsIcon",
               width: "@fsWidth"
            },
            controller: function($scope) {

            	$scope.actions = 0;
            	$scope.iconSize = 20 + 'px';
				$scope.styles = $scope.styles || {};

                if($scope.width) {
                	$scope.styles.minWidth = $scope.width + 'px';
                }

            	this.$scope = $scope;
            }
        };
    })
     .directive('fsStatAction', function($location, $timeout) {
        return {
            template: '<md-menu-item><md-button ng-if="href" ng-href="{{href}}">{{label}}</md-button><md-button ng-if="click" ng-click="click()">{{label}}</md-button></md-menu-item>',
            restrict: 'E',
            replace: true,
            scope: {
               click: '&?fsClick',
               href: '@fsHref',
               label: '@fsLabel'
            },
            require: '^fsStat',
            link: function($scope, element, attrs, ctrl) {
            	ctrl.$scope.actions++;
            }
        };
    });
})();