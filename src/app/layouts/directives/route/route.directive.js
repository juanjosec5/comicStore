(function() {
    'use strict';

    angular
        .module('homeModule')
        .directive('csRoute', csRoute);

        function csRoute() {
            return {
                templateUrl: '/layouts/directives/route/route.template.html'
            }
        }
})();
