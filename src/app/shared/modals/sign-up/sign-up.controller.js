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
                modalFactory.close();
            }
        }
    }
}());