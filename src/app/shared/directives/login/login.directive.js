(function () {
    'use strict';

    angular
        .module ('sharedModule')
        .directive ('csLogin', csLogin);

        csLogin.inject = []
    
    function csLogin() {

        return {
            controller: csLoginController,
            controllerAs: 'loginVm',
            restrict: 'E',
        }
    }

} ());
