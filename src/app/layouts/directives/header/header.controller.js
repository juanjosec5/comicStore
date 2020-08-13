(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('headerController', headerController);

        headerController.$inject = ['modalFactory'];

        function headerController(modalFactory) {
            var vm = this;
            vm.signIn = 'Sign in'
            vm.logIn = 'Login'
            vm.randomModal = randomModal;

            function randomModal() {
                modalFactory.openModal();
            }
        }
})();
