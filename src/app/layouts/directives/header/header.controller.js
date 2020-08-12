(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('headerController', headerController);

        headerController.$inject = [];

        function headerController() {
            var vm = this;
            vm.signIn = 'Sign in'
            vm.logIn = 'Login'
            vm.randomModal = randomModal;

            function randomModal() {
                console.log('opening Modal')
            }
        }
})();
