(function(){
    'use strict';

    angular
        .module('coreModule')
        .factory('modalFactory', modalFactory)

    modalFactory.inject = ['$uibModal'];

    function modalFactory($uibModal){

        return {
            openModal: openModal
        }

        function openModal(){
            $uibModal.open({
                
                templateUrl: '/shared/directives/base-modal/base-modal.html'
            });
        }
    }

}());
