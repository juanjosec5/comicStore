(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('loginModalController', loginModalController)

        loginModalController.inject = ['modalFactory', 'modalData'];

    function loginModalController(modalFactory, modalData){
        var vm = this;
        vm.actions = modalFactory;
        vm.modalData = modalData;
        vm.login = login;

        function login() {
            console.log('logging in');
            modalFactory.close();
        }
    }
}());