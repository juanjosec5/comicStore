(function() {
    'use strict';

    angular
        .module('homeModule')
        .controller('headerController', headerController);

    headerController.$inject = [
        'modalFactory', 
        'usersService',
        '$state'
    ];

    function headerController(modalFactory, usersService, $state) {
        var vm = this;
        vm.openLoginModal = openLoginModal;
        vm.openSignUpModal = openSignUpModal;
        vm.openBaseModal = openBaseModal;

        function openLoginModal() {
            usersService.openLoginModal().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    $state.go('comics');
                }
            });
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
