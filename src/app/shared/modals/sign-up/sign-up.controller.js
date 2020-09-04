(function(){
    'use strict';

    angular
        .module('sharedModule')
        .controller('signUpController', signUpController)

        signUpController.inject = ['modalFactory', 'modalData', 'usersService'];

    function signUpController(modalFactory,  modalData, usersService){
        var vm = this;
        vm.actions = modalFactory;
        vm.modalData = modalData;
        vm.signUp = signUp;
        vm.userData = {
            name: '',
            email: '',
            newPassword: '',
            confirmPassword: ''
        }

        function signUp(form) {
            console.log(form.$getControls());

            if (form.$invalid) {
                form.name.$setDirty();
                form.email.$setDirty();
                form.newPassword.$setDirty();
                form.confirmPassword.$setDirty();
            } else {
                usersService.registerUser(vm.userData);
                modalFactory.close();
            }
        }
    }
}());