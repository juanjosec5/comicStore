(function(){
    'use strict';

    angular
        .module('coreModule')
        .factory('modalFactory', modalFactory)

    modalFactory.inject = ['$uibModal'];

    function modalFactory($uibModal){
        var modalInstance;
        var defaultOptions = {
            templateUrl: '/shared/modals/base-modal/base-modal.html',
            keyboard: true,
            controller: 'baseModalController',
            controllerAs: 'baseModalVm',
            size: 'lg',
            resolve: {
                modalData: {
                    buttons: [{
                        text: 'login',
                        action: function () {
                            console.log('alskfn')
                        },
                        type: 'primary'
                    }],
                    random: 2
                }
            }
        }

        return {         
            openModal: openModal,
            close: close,
            dismiss: dismiss
        }

        function openModal(options){
            options = angular.merge({}, defaultOptions, options || {});
            modalInstance = $uibModal.open(options);
        }

        function close() {
            modalInstance.close();
        }

        function dismiss() {
            modalInstance.dismiss('cancel');
        }
    }
}());
