
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

angular.module('fs-angular-stat').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/namespace.html',
    ""
  );


  $templateCache.put('views/directives/stat.html',
    "<div layout=\"row\" class=\"fs-theme-primary-background-color fs-stat-wrap\" flex ng-style=\"styles\"><div flex><div ng-if=\"value\" class=\"fs-stat-heading\">{{ value }}</div><div ng-if=\"label\" class=\"fs-stat-label\">{{ label }}</div><div ng-if=\"sublabel\" class=\"fs-stat-sublabel\">{{ sublabel }}</div></div><md-menu ng-show=\"actions\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-icon-button md-ink-ripple\" type=\"button\" ng-click=\"$mdOpenMenu($event)\"><md-icon>more_vert</md-icon></md-button><md-menu-content ng-transclude=\"action\"></md-menu-content></md-menu><md-icon class=\"stat-icon\" ng-if=\"icon\">{{ icon }}</md-icon></div>"
  );

}]);
