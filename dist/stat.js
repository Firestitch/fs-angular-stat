
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
               options: "@fsOptions",
               value: "@fsValue",
               label: "@fsLabel",
               sublabel: "@fsSublabel",
               icon: "@fsIcon",
               width: "@fsWidth"
            },
            controller: function($scope) {
            	$scope.width = $scope.width || 200;
            	$scope.options = angular.merge({
                    minWidth: $scope.width + 'px',
                    'background-color': '#546e7a'
                }, $scope.options);

                $scope.actions = 0;
            	$scope.iconSize = parseInt($scope.options.height) + 20 + 'px';

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
    "<div layout=\"row\" class=\"stat-content\" flex ng-style=\"options\"><div layout=\"column\" flex><b ng-if=\"value\" class=\"heading\">{{ value }}</b> <span ng-if=\"label\">{{ label }}</span> <small ng-if=\"sublabel\">{{ sublabel }}</small></div><md-icon class=\"stat-icon\" ng-if=\"icon\" ng-style=\"{ 'width': iconSize, 'height': iconSize, 'font-size': iconSize }\">{{ icon }}</md-icon><md-menu ng-show=\"actions\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-icon-button md-ink-ripple\" type=\"button\" ng-click=\"$mdOpenMenu($event)\"><md-icon>more_vert</md-icon></md-button><md-menu-content ng-transclude=\"action\"></md-menu-content></md-menu></div>"
  );

}]);
