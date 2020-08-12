(function() {
    'use strict';

    angular
        .module('homeModule')
        .directive('homeTest', homeTest);

        function homeTest() {
            return {
                templateUrl:'/features/home/home.template.html'
            }
        }
})();
