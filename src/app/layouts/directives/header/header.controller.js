(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('headerController', headerController);

    headerController.$inject = ['modalFactory'];

    function headerController(modalFactory) {
        var vm = this;
        vm.openLoginModal = openLoginModal;
        vm.openSignUpModal = openSignUpModal;
        vm.openBaseModal = openBaseModal;

        function openLoginModal() {
            var loginModalOption = {
                templateUrl: '/shared/modals/login/login.html',
                controller: 'loginModalController',
                controllerAs: 'loginModalVm',
                resolve: {
                    modalData: {
                        title:'Login Modal Title',
                        buttons: [
                                {
                                text: 'Log in',
                                action: modalFactory.close,
                                type: 'primary'
                            },
                            {
                                text: 'Cancel',
                                action: modalFactory.dismiss,
                                type: 'secondary'
                            }
                        ]
                    }
                }
            }
            modalFactory.openModal(loginModalOption);
        }

        function openSignUpModal() {
            var signUpModalOptions = {
                templateUrl: '/shared/modals/sign-up/sign-up.html',
                controller: 'signUpController',
                controllerAs: 'signUpModalVm',
                resolve: {
                    modalData: {
                        title:'Sign up Modal Title',
                        body: 'Sign up Modal Body',
                        buttons: [
                                {
                                text: 'Sign Up',
                                action: modalFactory.close,
                                type: 'primary'
                            },
                            {
                                text: 'Cancel',
                                action: modalFactory.dismiss,
                                type: 'secondary'
                            }
                        ]
                    }
                }
            }
            modalFactory.openModal(signUpModalOptions);
        }

        function openBaseModal() {
            var baseModalOptions = {
                resolve: {
                    modalData: {
                        title:'replaced title',
                        body: 'replaced body',
                        buttons: [
                            {
                                text: 'BLA',
                                action: modalFactory.close,
                                type: 'primary'
                            },
                        ]
                    }
                }
            }
            modalFactory.openModal(baseModalOptions);
        }
    }
})();
