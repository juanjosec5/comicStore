(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('loginModalController', loginModalController)

        loginModalController.inject = ['modalFactory'];

    function loginModalController(modalFactory){
        var vm = this;
        vm.actions = modalFactory;
        vm.login = login;

        function login() {
            console.log('logging in');
            modalFactory.close();
        }
    }
}());