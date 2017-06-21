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