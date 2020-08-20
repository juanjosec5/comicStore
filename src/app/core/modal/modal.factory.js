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
            size: 'md',
            backdrop: 'static',
            resolve: {
                modalData: {
                    title:'override me',
                    body: 'override me',
                    buttons: false,
                    closeIcon: true
                }
            }
        }

        return {
            openModal: openModal,
            close: close,
            dismiss: dismiss
        }

        function openModal(options){
            options = _.mergeWith({}, defaultOptions, options || {}, mergeCustomizer);
            modalInstance = $uibModal.open(options);
            return modalInstance;
        }

        function close() {
            modalInstance.close();
        }

        function dismiss() {
            modalInstance.dismiss('cancel');
        }

        function mergeCustomizer(objValue, srcValue) {
            if (_.isArray(objValue) ||  _.isArray(srcValue)) {
                return srcValue;
            }
        }
    }
}());
