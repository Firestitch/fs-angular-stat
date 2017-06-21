
(function () {
    'use strict';

    angular.module('fs-angular-stat',[])
    .directive('fsStat', function($location, $timeout) {
        return {
            templateUrl: 'views/directives/stat.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {
               options: "@fsOptions"
            },
            link: function($scope, element, attrs, ctrl, $transclude) {

                $timeout(function() {
                    $scope.options = angular.merge({
                        width: '200px',
                        height: '80px',
                        'background-color': '#546e7a'
                    }, $scope.options);

                    $scope.iconSize = parseInt($scope.options.height) + 20 + 'px';

                    $scope.value = angular.element(element).attr('fs-value');
                    $scope.label = angular.element(element).attr('fs-label');
                    $scope.sublabel = angular.element(element).attr('fs-sublabel');
                    $scope.icon = angular.element(element).attr('fs-icon');

                    $transclude(function(clone, scope) {

                        $scope.actions = [];

                        angular.forEach(clone, function(el) {

                            var item = angular.element(el);

                            if(item.prop("tagName") != 'FS-STAT-ACTION')return;

                            $scope.actions.push({
                                label: angular.element(el).attr("fs-label"),
                                href: angular.element(el).attr("fs-href") || null,
                                click: angular.element(el).attr("fs-click") || null
                            });
                        });
                    });
                });

                $scope.redirect = function(path) {
                    $location.path(path);
                };

                $scope.callFunction = function (name){
                    if(angular.isFunction($scope.$parent[name]))
                        $scope.$parent[name]();
                };
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
    "<div ng-style=\"options\" class=\"stat-container\" layout=\"column\"><div layout=\"row\" class=\"stat-content\" flex><div layout=\"column\" flex><b ng-if=\"value\" class=\"heading\">{{ value }}</b> <span ng-if=\"label\">{{ label }}</span> <small ng-if=\"sublabel\">{{ sublabel }}</small></div><md-icon class=\"stat-icon\" ng-if=\"icon\" ng-style=\"{ 'width': iconSize, 'height': iconSize, 'font-size': iconSize }\">{{ icon }}</md-icon><md-menu ng-if=\"actions.length\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-icon-button md-ink-ripple\" type=\"button\" ng-click=\"$mdOpenMenu($event)\"><md-icon>more_vert</md-icon></md-button><md-menu-content><md-menu-item ng-repeat=\"item in actions\"><md-button ng-if=\"item.href\" ng-click=\"redirect(item.href)\">{{ item.label }}</md-button><md-button ng-if=\"item.click\" ng-click=\"callFunction(item.click)\">{{ item.label }}</md-button></md-menu-item></md-menu-content></md-menu></div></div>"
  );

}]);
