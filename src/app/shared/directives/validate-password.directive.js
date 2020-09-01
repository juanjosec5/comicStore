(function () {
    'use strict';

    angular
        .module ('sharedModule')
        .directive ('validatePassword', validatePassword);

    /** @ngInject */
    function validatePassword() {

        function link(scope, elem, att, ngmodel) {
            ngmodel.$validators['pass-validator'] = passValidator;
            scope.$watch('newPassword', watchPass);

            function watchPass(newValue, oldValue) {
                ngmodel.$validate();
            }

            function passValidator(modelValue, viewValue) {
                return !!modelValue && scope.newPassword === modelValue;
            }
        }

        return {
            link: link,
            restrict: 'A',
            scope: {
                newPassword: '=', 
            },
            require: 'ngModel'
        }
    }

} ());
