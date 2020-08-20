(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('loginModalController', loginModalController)

        loginModalController.inject = ['modalFactory', 'modalData'];

    function loginModalController(modalFactory, modalData){
        var vm = this;
        
        activate();
        
        function activate() {
            vm.actions = modalFactory;
            vm.modalData = modalData;
            vm.login = login;
            vm.credentials = {
                email: '',
                password: ''
            }
        }

        function login(form) {
            console.log('logging in', vm.credentials, form);

            if (form.$invalid) {
                form.email.$setDirty();
                form.password.$setDirty();
            } else {
                modalFactory.close(); 
            }
        }
    }
}());
