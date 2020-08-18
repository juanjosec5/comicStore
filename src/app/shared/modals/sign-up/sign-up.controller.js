(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('signUpController', signUpController)

        signUpController.inject = ['modalFactory'];

    function signUpController(modalFactory){
        var vm = this;
        vm.actions = modalFactory;
        vm.signUp = signUp;

        function signUp() {
            console.log('signing up in');
            modalFactory.close();
        }
    }
}());