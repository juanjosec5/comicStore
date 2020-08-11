(function() {
    'use strict';

    angular
        .module('homeModule')
        .directive('csHeader', csHeader);

        function csHeader() {
            return {
                restrict: 'EA',
                templateUrl: '/layouts/directives/header/header.template.html',
            }
        }
})();
