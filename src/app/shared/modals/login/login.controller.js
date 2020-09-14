(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('loginModalController', loginModalController)

        loginModalController.inject = ['modalFactory', 'modalData', 'usersService', '$state'];

    function loginModalController(modalFactory, modalData, usersService, $state){
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

            if (form.$invalid) {
                form.email.$setDirty();
                form.password.$setDirty();
            } else {
                usersService.loginUser(vm.credentials).then(function (isLoggedIn) {
                    if (isLoggedIn) {
                        //redirect to new page
                        $state.go('comics');
                        modalFactory.close();
                        
                    } else {
                        vm.loginError = true;
                    }
                });
            }
        }
    }
}());
