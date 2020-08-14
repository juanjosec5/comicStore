(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('headerController', headerController);

    headerController.$inject = ['modalFactory'];

    function headerController(modalFactory) {
        var vm = this;
        vm.openLoginModal = openLoginModal;
        vm.openSignUpModal = openSignUpModal;

        function openLoginModal() {
            var loginModalOption = {
                templateUrl: '/shared/modals/login/login.html',
                controller: 'loginModalController',
                controllerAs: 'loginModalVm'
            }
            modalFactory.openModal(loginModalOption);
        }

        function openSignUpModal() {
            var signUpModalOptions = {
                templateUrl: '/shared/modals/login/login.html',
                controller: 'loginModalController',
                controllerAs: 'loginModalVm'
            }
            modalFactory.openModal(signUpModalOptions);
        }
    }
})();
