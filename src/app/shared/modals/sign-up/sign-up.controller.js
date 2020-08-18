(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('signUpController', signUpController)

        signUpController.inject = ['modalFactory', 'modalData'];

    function signUpController(modalFactory,  modalData){
        var vm = this;
        vm.actions = modalFactory;
        vm.modalData = modalData;
        vm.signUp = signUp;

        function signUp() {
            console.log('signing up in');
            modalFactory.close();
        }
    }
}());