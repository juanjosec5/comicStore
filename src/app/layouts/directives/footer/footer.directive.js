(function() {
    'use strict';

    angular
        .module('homeModule')
        .directive('csFooter', csFooter);

        function csFooter() {
            return {
                templateUrl:'/layouts/directives/footer/footer.template.html'
            }
        }
})();
